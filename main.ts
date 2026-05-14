function recalage () {
    if (color == 2) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 40)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 40)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 40)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 40)
    }
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Backward, 40)
    basic.pause(2000)
    StopMotors()
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 44) {
        tirette = 1
    }
    if (receivedNumber == 22) {
        color = 2
    }
    if (receivedNumber == 11) {
        color = 1
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
            // maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            // maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            StopMotors()
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
            // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
            // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, 5)
            basic.pause(200)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            break;
        }
    }
    StopMotors()
}
input.onButtonPressed(Button.A, function () {
    color = 1
    GOGOGO()
    recalage()
    untilWhite()
    avance2cm()
    butiner()
})
function alarme () {
    basic.showIcon(IconNames.Heart)
    music.setVolume(255)
    music.playTone(988, 200)
    music.playTone(740, 200)
    basic.pause(100)
}
function butiner () {
    butiner2 = 1
    maqueen.servoRun(maqueen.Servos.S2, 10)
}
function untilWhite () {
    startTime = input.runningTime()
    while (true) {
        elapsed = input.runningTime() - startTime
        if (advDetected == 0) {
            if (elapsed < 1000) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 200)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            } else {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 40)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 40)
            }
        }
        leftSensor = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
        rightSensor = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
        serial.writeValue("L", leftSensor)
        serial.writeValue("R", rightSensor)
        if (leftSensor == 1 && rightSensor == 1) {
            StopMotors()
            break;
        }
        basic.pause(30)
    }
    StopMotors()
}
function GOGOGO () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(500)
    // untilDetectionAndTime(1500)
    // untilDetectionAndTime(1500)
    if (color == 2) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 250)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
        basic.pause(1500)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 180)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 250)
        basic.pause(1500)
    }
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
    basic.pause(100)
    if (color == 2) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 10)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, 5)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        basic.pause(900)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 20)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, 5)
        basic.pause(900)
    }
    StopMotors()
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
    recalage()
    untilWhite()
    avance2cm()
    butiner()
})
function untilV53L1X () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 180)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 180)
    // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
    while (true) {
        distancedetection = VL53L1X.readSingle()
        serial.writeValue("dist", distancedetection)
        led.plotBarGraph(
        distancedetection,
        400,
        false
        )
        if (distancedetection >= 170 || distancedetection < 50) {
            StopMotors()
            break;
        }
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 30)
        basic.pause(30)
    }
    StopMotors()
    StopMotors()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    VL53L1X.init()
    VL53L1X.setMeasurementTimingBudget(50000)
    VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
    untilV53L1X()
})
function attendreDepart () {
    distancedetection = VL53L1X.readSingle()
    // serial.writeValue("dist", distancedetection)
    while (distancedetection < 120) {
        alarme()
        distancedetection = VL53L1X.readSingle()
    }
    music.stopAllSounds()
    music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.stopAllSounds()
    basic.clearScreen()
}
function avance2cm () {
    StopMotors()
}
let endOfMach = 0
let rightSensor = 0
let leftSensor = 0
let advDetected = 0
let elapsed = 0
let startTime = 0
let distancedetection = 0
let timer_ongoing = 0
let timer_init = 0
let color = 0
let butiner2 = 0
let tirette = 0
let countdetection = 0
let dist = 0
let enabledetection = 0
tirette = 0
butiner2 = 0
color = 0
Maqueen_V5.I2CInit()
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
radio.setGroup(169)
radio.setFrequencyBand(64)
radio.setTransmitPower(7)
// maqueenPlusV2.I2CInit()
serial.redirectToUSB()
VL53L1X.init()
VL53L1X.setDistanceMode(VL53L1X.DistanceMode.Short)
VL53L1X.setMeasurementTimingBudget(50000)
attendreDepart()
maqueen.servoRun(maqueen.Servos.S2, 83)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
strip.clear()
strip.show()
basic.forever(function () {
    while (tirette == 0) {
        distancedetection = VL53L1X.readSingle()
        serial.writeValue("dist", distancedetection)
        serial.writeValue("L", maqueen.readPatrol(maqueen.Patrol.PatrolLeft))
        serial.writeValue("R", maqueen.readPatrol(maqueen.Patrol.PatrolRight))
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
    basic.pause(100)
    GOGOGO()
    recalage()
    untilWhite()
    avance2cm()
    StopMotors()
    butiner()
    tirette = 0
    color = 0
})
control.inBackground(function () {
    while (true) {
        if (color == 2) {
            // strip.showColor(neopixel.colors(NeoPixelColors.Blue))
            if (butiner2 == 1) {
                strip.clear()
                strip.showColor(neopixel.colors(NeoPixelColors.Black))
                strip.show()
                basic.pause(500)
                strip.showRainbow(1, 360)
                strip.show()
                basic.pause(500)
            } else {
            	
            }
        } else {
            // strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            if (butiner2 == 1) {
                strip.clear()
                strip.showColor(neopixel.colors(NeoPixelColors.Black))
                strip.show()
                basic.pause(500)
                strip.showRainbow(1, 360)
                strip.show()
                basic.pause(500)
            } else {
            	
            }
        }
        // maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 50)
        basic.pause(1000)
    }
})
control.inBackground(function () {
    while (tirette == 0) {
        basic.pause(100)
    }
    basic.pause(99500)
    endOfMach = 1
    butiner()
    while (true) {
        StopMotors()
    }
})
control.inBackground(function () {
    while (true) {
        distancedetection = VL53L1X.readSingle()
        serial.writeValue("dist", distancedetection)
        if (distancedetection < 100 && distancedetection > 0) {
            advDetected = 1
            StopMotors()
        } else {
            advDetected = 0
        }
        basic.pause(30)
    }
})
