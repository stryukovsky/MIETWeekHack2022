using System;
using Ozeki.Media.MediaHandlers;
using Ozeki.VoIP;
using Ozeki.VoIP.SDK;

namespace Caller
{
    class Program
    {
        static ISoftPhone softphone;
        static IPhoneLine phoneLine;
        static IPhoneCall call;
        static Microphone microphone;
        static Speaker speaker;
        static MediaConnector connector;
        static PhoneCallAudioSender mediaSender;
        static PhoneCallAudioReceiver mediaReceiver;
        static WaveStreamPlayback player;

        static string addresseePhone;


        // args = [ "userName", "password", "domainHost", domainPortIntNumber, "absolutePathToWaveFile",  "addresseePhone" ]
        private static void Main(string[] args)
        {
            // Create a softphone object with RTP port range 5000-10000
            softphone = SoftPhoneFactory.CreateSoftPhone(5000, 10000);

            string userName, registerPassword, domainHost;
            int domainPort;
            SIPAccount account;

            if (args.Length != 6)
            {
                var registrationRequired = false;
                userName = "user9";
                var displayName = userName;
                var authenticationId = userName;
                registerPassword = "SR6hYqjo";
                domainHost = "vpbx400135286.mangosip.ru";
                domainPort = 5060;
                // TODO: поменять пуль на относительный
                player = new WaveStreamPlayback(@"C:\Users\kondi\Desktop\file_example_WAV_1MG.wav");
                addresseePhone = "5559201";

                account = new SIPAccount(registrationRequired, displayName, userName, authenticationId, registerPassword, domainHost, domainPort);
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

                account = new SIPAccount(registrationRequired, displayName, userName, authenticationId, registerPassword, domainHost, domainPort);
            }

            // Send SIP regitration request
            RegisterAccount(account);

            mediaSender = new PhoneCallAudioSender();
            mediaReceiver = new PhoneCallAudioReceiver();
            connector = new MediaConnector();

            Console.ReadLine();
        }

        static void RegisterAccount(SIPAccount account)
        {
            try
            {
                phoneLine = softphone.CreatePhoneLine(account);
                phoneLine.RegistrationStateChanged += line_RegStateChanged;
                softphone.RegisterPhoneLine(phoneLine);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during SIP registration: " + ex);
            }
        }

        static void line_RegStateChanged(object sender, RegistrationStateChangedArgs e)
        {
            if (e.State == RegState.NotRegistered || e.State == RegState.Error)
                Console.WriteLine("Registration failed!");

            if (e.State == RegState.RegistrationSucceeded)
            {
                Console.WriteLine("Registration succeeded - Online!");
                CreateCall();
            }
        }

        private static void CreateCall()
        {
            var numberToDial = addresseePhone;
            call = softphone.CreateCallObject(phoneLine, numberToDial);
            call.CallStateChanged += call_CallStateChanged;
            call.Start();
        }

        private static void SetupDevices()
        {
            connector.Connect(microphone, mediaSender);
            connector.Connect(mediaReceiver, speaker);

            mediaSender.AttachToCall(call);
            mediaReceiver.AttachToCall(call);

            microphone.Start();
            speaker.Start();
        }

        static void SetupPlayer()
        {
            connector.Connect(player, mediaSender);
            mediaSender.AttachToCall(call);

            player.Start();

            Console.WriteLine("The wav player is streaming.");
        }


        static void call_CallStateChanged(object sender, CallStateChangedArgs e)
        {
            Console.WriteLine("Call state: {0}.", e.State);

            if (e.State == CallState.Answered)
                SetupPlayer();
        }
    }
}