function recalage () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 100)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Backward, 40)
    basic.pause(500)
    StopMotors()
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 44) {
        tirette = 1
    }
})
function StopMotors () {
    // maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    // servos.P2.run(0)
    // servos.P2.stop()
    maqueen.motorStop(maqueen.Motors.All)
}
function untilDetectionAndTime (num: number) {
    timer_init = input.runningTime()
    while (timer_ongoing - timer_init < num) {
        timer_ongoing = input.runningTime()
        distancedetection = VL53L1X.readSingle()
        serial.writeValue("dist", distancedetection)
        led.plotBarGraph(
        distancedetection,
        400,
        false
        )
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        if (distancedetection < 50) {
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            StopMotors()
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
            // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
            // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, 5)
            basic.pause(500)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            break;
        }
    }
}
input.onButtonPressed(Button.A, function () {
    color = 1
    GOGOGO()
    StopMotors()
    recalage()
    StopMotors()
    untilV53L1X()
    StopMotors()
    avance2cm()
    StopMotors()
    butiner()
})
function butiner () {
    maqueen.servoRun(maqueen.Servos.S2, 10)
}
function GOGOGO () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(500)
    if (color == 2) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 250)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 150)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
        basic.pause(4300)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 150)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 250)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
        basic.pause(4300)
    }
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(100)
    if (color == 2) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 5)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, 5)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        basic.pause(1000)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 5)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, 5)
        basic.pause(1000)
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "BLUE") {
        color = 2
    }
    if (receivedString == "YELLOW") {
        color = 1
    }
})
input.onButtonPressed(Button.B, function () {
    color = 2
    GOGOGO()
    StopMotors()
    recalage()
    StopMotors()
    untilV53L1X()
    StopMotors()
    avance2cm()
    StopMotors()
    butiner()
})
function untilV53L1X () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 60)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
    while (true) {
        distancedetection = VL53L1X.readSingle()
        serial.writeValue("dist", distancedetection)
        led.plotBarGraph(
        distancedetection,
        400,
        false
        )
        if (distancedetection >= 90 || distancedetection < 50) {
            StopMotors()
            break;
        }
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
        basic.pause(50)
    }
    StopMotors()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    VL53L1X.init()
    VL53L1X.setMeasurementTimingBudget(50000)
    VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
    untilV53L1X()
})
function avance2cm () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(300)
    StopMotors()
}
let endOfMach = 0
let distancedetection = 0
let timer_ongoing = 0
let timer_init = 0
let color = 0
let tirette = 0
let enabledetection = 0
let dist = 0
let countdetection = 0
Maqueen_V5.I2CInit()
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
radio.setGroup(169)
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
tirette = 0
color = 0
// maqueenPlusV2.I2CInit()
serial.redirectToUSB()
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
VL53L1X.setMeasurementTimingBudget(50000)
maqueen.servoRun(maqueen.Servos.S2, 85)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
strip.clear()
strip.show()
basic.forever(function () {
    while (tirette == 0) {
        distancedetection = VL53L1X.readSingle()
        serial.writeValue("dist", distancedetection)
        if (color == 1) {
            basic.clearScreen()
            basic.showIcon(IconNames.Skull)
        }
        if (color == 2) {
            basic.clearScreen()
            basic.showIcon(IconNames.Diamond)
        }
        if (color == 0) {
            basic.clearScreen()
            led.plotBarGraph(
            distancedetection,
            400,
            false
            )
        }
        basic.pause(100)
    }
    basic.clearScreen()
    basic.showIcon(IconNames.Angry)
    basic.pause(85000)
    GOGOGO()
    untilV53L1X()
    StopMotors()
    butiner()
    tirette = 0
    color = 0
})
control.inBackground(function () {
    while (tirette == 0) {
        basic.pause(100)
    }
    basic.pause(10000)
    endOfMach = 1
    butiner()
    while (true) {
        StopMotors()
    }
})
control.inBackground(function () {
    while (true) {
        if (color == 2) {
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        } else {
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        }
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
        basic.pause(1000)
    }
})
