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
input.onButtonPressed(Button.A, function () {
    enabledetection = 0
    color = 1
    GOGOGO()
    untilV53L1X()
    StopMotors()
    butiner()
    enabledetection = 0
})
function butiner () {
    // servos.P2.run(30)
    maqueen.servoRun(maqueen.Servos.S1, 90)
}
function GOGOGO () {
    if (color == 2) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 103)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 100)
        basic.pause(1000)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 225)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 225)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 225)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 220)
        enabledetection = 1
        basic.pause(2200)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
        basic.pause(1000)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
        enabledetection = 1
        basic.pause(2200)
    }
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(100)
    enabledetection = 0
    if (color == 2) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 5)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 60)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, 5)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        basic.pause(1200)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 60)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 5)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, 5)
        basic.pause(1200)
    }
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 40)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Backward, 40)
    basic.pause(2000)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 40)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)
    basic.pause(1500)
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
    enabledetection = 0
    color = 2
    GOGOGO()
    untilV53L1X()
    StopMotors()
    butiner()
    enabledetection = 0
})
function untilV53L1X () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
    while (true) {
        serial.writeValue("dist", VL53L1X.readSingle())
        if (VL53L1X.readSingle() >= 60) {
            StopMotors()
            break;
        }
    }
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 40)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
    basic.pause(1000)
    StopMotors()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    VL53L1X.init()
    VL53L1X.setMeasurementTimingBudget(50000)
    VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
    untilV53L1X()
})
let distancedetection = 0
let color = 0
let tirette = 0
let enabledetection = 0
let countdetection = 0
let dist = 0
// maqueenPlusV2.I2CInit()
serial.redirectToUSB()
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
VL53L1X.setMeasurementTimingBudget(50000)
// servos.P2.run(0)
maqueen.servoRun(maqueen.Servos.S1, 0)
enabledetection = 0
radio.setGroup(169)
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
tirette = 0
color = 0
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
    basic.pause(1000)
    while (true) {
        distancedetection = VL53L1X.readSingle()
        serial.writeValue("dist", distancedetection)
        if (enabledetection == 1) {
            if ((0 as any) < (50 as any)) {
                StopMotors()
                break;
            }
        }
        if ((0 as any) >= (70 as any)) {
            StopMotors()
            break;
        }
        basic.pause(50)
    }
})
control.inBackground(function () {
    while (tirette == 0) {
        basic.pause(100)
    }
    basic.pause(99000)
    butiner()
})
