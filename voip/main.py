from pyVoIP.VoIP import VoIPPhone, InvalidStateError


def answer(call):
    try:
        call.answer()
        call.hangup()
    except InvalidStateError:
        pass


def main():
    phone = VoIPPhone("server",
                      "sip server port",
                      "username",
                      "password",
                      callCallback=answer,
                      myIP="",
                      sipPort=5060,
                      rtpPortLow="",
                      rtpPortHigh=""
                      )
    phone.start()
    input('Press enter to disable the phone')
    phone.stop()


if __name__ == "__main__":
    main()
