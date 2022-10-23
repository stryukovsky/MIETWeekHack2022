using System;
using Ozeki.Media.MediaHandlers;
using Ozeki.VoIP;
using Ozeki.VoIP.SDK;


namespace ozeki.voip.sip.client
{
    //These classes is just an example how to use OZEKI VoIP SIP SDK, what dll is added to the References in Solution Explorer
    //Feel free to use the other components of this SDK
    //For More information please visit : http://www.voip-sip-sdk.com and http://www.ozekiphone.com/ozeki-voip-sip-client-997.html
    class CallHandlerSample
    {
        private ISoftPhone softPhone;
        private IPhoneLine phoneLine;
        private RegState phoneLineInformation;
        private IPhoneCall call;
        private readonly Microphone microphone;
        private readonly Speaker speaker;
        private readonly MediaConnector connector;
        private readonly PhoneCallAudioSender mediaSender;
        private readonly PhoneCallAudioReceiver mediaReceiver;

        /// <summary>
        /// Event triggered when the registered softphone has called
        /// </summary>
        public event EventHandler<VoIPEventArgs<IPhoneCall>> IncomingCallReceived;

        /// <summary>
        /// Event the softphone has successfully registered
        /// </summary>
        public event EventHandler RegistrationSucceded;

        /// <summary>
        /// Handler of making call and receiving call
        /// </summary>
        /// <param name="registerName">The SIP ID what will registered into your PBX</param>
        /// <param name="domainHost">The address of your PBX</param>
        public CallHandlerSample(string registerName, string domainHost)
        {
            microphone = Microphone.GetDefaultDevice();
            speaker = Speaker.GetDefaultDevice();
            connector = new MediaConnector();
            mediaSender = new PhoneCallAudioSender();
            mediaReceiver = new PhoneCallAudioReceiver();

            InitializeSoftPhone(registerName, domainHost);
        }


        /// <summary>
        ///It initializes a softphone object with a SIP PBX, and it is for requisiting a SIP account that is nedded for a SIP PBX service. It registers this SIP
        ///account to the SIP PBX through an ’IphoneLine’ object which represents the telephoneline. 
        ///If the telephone registration is successful we have a call ready softphone. In this example the softphone can be reached by dialing the registername.
        /// </summary>
        /// <param name="registerName">The SIP ID what will registered into your PBX</param>
        /// <param name="domainHost">The address of your PBX</param>
        private void InitializeSoftPhone(string registerName, string domainHost)
        {
            try
            {
                softPhone = SoftPhoneFactory.CreateSoftPhone(5700, 5800);
                softPhone.IncomingCall += softPhone_IncomingCall;
                phoneLine = softPhone.CreatePhoneLine(new SIPAccount(true, registerName, registerName, registerName, registerName, domainHost, 5060));
                phoneLine.RegistrationStateChanged += phoneLine_PhoneLineInformation;

                softPhone.RegisterPhoneLine(phoneLine);
            }
            catch (Exception ex)
            {
                Console.WriteLine("You didn't give your local IP adress, so the program won't run properly.\n {0}", ex.Message);
            }
        }

        /// <summary>
        /// Create and start the call to the dialed number
        /// </summary>
        /// <param name="dialedNumber"></param>
        public void Call(string dialedNumber)
        {
            if (phoneLineInformation != RegState.RegistrationSucceeded)
            {
                Console.WriteLine("Phone line state is not valid!");
                return;
            }

            if (string.IsNullOrEmpty(dialedNumber))
                return;

            if (call != null)
                return;

            call = softPhone.CreateCallObject(phoneLine, dialedNumber);
            WireUpCallEvents();
            call.Start();
        }

        /// <summary>
        /// Occurs when phone line state has changed.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void phoneLine_PhoneLineInformation(object sender, RegistrationStateChangedArgs e)
        {
            phoneLineInformation = e.State;
            Console.WriteLine("Register name:" + ((IPhoneLine)sender).SIPAccount.RegisterName);

            if (e.State == RegState.RegistrationSucceeded)
            {
                Console.WriteLine("Registration succeeded. Online.");
                OnRegistrationSucceded();
            }
            else
            {
                Console.WriteLine("Current state:" + e.State);
            }
        }

        /// <summary>
        /// Occurs when an incoming call request has received.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void softPhone_IncomingCall(object sender, VoIPEventArgs<IPhoneCall> e)
        {
            Console.WriteLine("Incoming call from {0}", e.Item.DialInfo);
            call = e.Item;
            WireUpCallEvents();
            OnIncomingCallReceived(e.Item);
        }

        /// <summary>
        /// Occurs when the phone call state has changed.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void call_CallStateChanged(object sender, CallStateChangedArgs e)
        {
            Console.WriteLine("Call state changed: " + e.State);

            switch (e.State)
            {
                case CallState.InCall:
                    ConnectDevicesToCall();
                    break;
                case CallState.Completed:
                    DisconnectDevicesFromCall();
                    WireDownCallEvents();
                    call = null;
                    break;
                case CallState.Cancelled:
                    WireDownCallEvents();
                    call = null;
                    break;
            }
        }

        private void OnRegistrationSucceded()
        {
            var handler = RegistrationSucceded;

            if (handler != null)
                handler(this, EventArgs.Empty);
        }

        private void OnIncomingCallReceived(IPhoneCall item)
        {
            var handler = IncomingCallReceived;

            if (handler != null)
                handler(this, new VoIPEventArgs<IPhoneCall>(item));
        }

        /// <summary>
        /// Connecting the microphone and speaker to the call
        /// </summary>
        private void ConnectDevicesToCall()
        {
            if (microphone != null)
                microphone.Start();
            connector.Connect(microphone, mediaSender);

            if (speaker != null)
                speaker.Start();
            connector.Connect(mediaReceiver, speaker);

            mediaSender.AttachToCall(call);
            mediaReceiver.AttachToCall(call);
        }

        /// <summary>
        /// Disconnecting the microphone and speaker from the call
        /// </summary>
        private void DisconnectDevicesFromCall()
        {
            if (microphone != null)
                microphone.Stop();
            connector.Disconnect(microphone, mediaSender);

            if (speaker != null)
                speaker.Stop();
            connector.Disconnect(mediaReceiver, speaker);

            mediaSender.Detach();
            mediaReceiver.Detach();
        }

        /// <summary>
        ///  It signs up to the necessary events of a call transact.
        /// </summary>
        private void WireUpCallEvents()
        {
            if (call != null)
            {
                call.CallStateChanged += ( call_CallStateChanged );
            }
        }

        /// <summary>
        /// It signs down from the necessary events of a call transact.
        /// </summary>
        private void WireDownCallEvents()
        {
            if (call != null)
            {
                call.CallStateChanged -= (call_CallStateChanged);
            }
        }

        ~CallHandlerSample()
        {
            if (softPhone != null)
                softPhone.Close();
            WireDownCallEvents();
        }
    }
}
