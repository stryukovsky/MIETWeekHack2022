using Ozeki.Media.MediaHandlers;
using Ozeki.VoIP;
using Ozeki.VoIP.SDK;

namespace Caller;

internal static class Program
{
    private static ISoftPhone softphone;
    private static IPhoneLine phoneLine;
    private static IPhoneCall call;
    private static Microphone microphone;
    private static MediaConnector connector;
    private static PhoneCallAudioSender mediaSender;
    private static WaveStreamPlayback player;
    private static string addresseePhone;

    // args = [ "userName", "password", "domainHost", domainPortIntNumber, "absolutePathToWaveFile",  "addresseePhone" ]
    private static void Main(string[] args)
    {
        softphone = SoftPhoneFactory.CreateSoftPhone(5000, 10000);

        string userName, registerPassword, domainHost;
        int domainPort;
        SIPAccount account;

        if (args.Length == 0)
        {
            var registrationRequired = false;
            userName = "user9";
            var displayName = userName;
            var authenticationId = userName;
            registerPassword = "SR6hYqjo";
            domainHost = "vpbx400135286.mangosip.ru";
            domainPort = 5060;
            player = new WaveStreamPlayback("sample3.wav");
            addresseePhone = "5559201";

            account = new SIPAccount(registrationRequired, displayName, userName, authenticationId,
                registerPassword, domainHost, domainPort);
        }
        else
        {
            var registrationRequired = false;
            userName = args[0];
            var displayName = userName;
            var authenticationId = userName;
            registerPassword = args[1];
            domainHost = args[2];
            domainPort = int.Parse(args[3]);
            player = new WaveStreamPlayback(args[4]);
            addresseePhone = args[5];

            account = new SIPAccount(registrationRequired, displayName, userName, authenticationId,
                registerPassword, domainHost, domainPort);
        }
        RegisterAccount(account);

        mediaSender = new PhoneCallAudioSender();
        connector = new MediaConnector();

        Console.ReadLine();
    }

    private static void RegisterAccount(SIPAccount account)
    {
        try
        {
            phoneLine = softphone.CreatePhoneLine(account);
            phoneLine.RegistrationStateChanged += RegStateChanged;
            softphone.RegisterPhoneLine(phoneLine);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error during SIP registration: " + ex);
        }
    }

    private static void RegStateChanged(object? sender, RegistrationStateChangedArgs e)
    {
        switch (e.State)
        {
            case RegState.NotRegistered:
            case RegState.Error:
                Console.WriteLine("Registration failed!");
                break;
            case RegState.RegistrationSucceeded:
                Console.WriteLine("Registration succeeded - Online!");
                CreateCall();
                break;
            case RegState.RegistrationRequested:
                break;
            case RegState.UnregRequested:
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
    }

    private static void CreateCall()
    {
        var numberToDial = addresseePhone;
        call = softphone.CreateCallObject(phoneLine, numberToDial);
        call.CallStateChanged += CallStateChanged;
        call.Start();
    }

    private static void SetupPlayer()
    {
        connector.Connect(player, mediaSender);
        mediaSender.AttachToCall(call);

        player.Start();

        Console.WriteLine("The wav player is streaming.");
    }

    private static void CallStateChanged(object? sender, CallStateChangedArgs e)
    {
        Console.WriteLine("Call state: {0}.", e.State);

        if (e.State == CallState.Answered)
            SetupPlayer();
    }
}