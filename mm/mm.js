function debugMessage(msg, msgVar) {
    alert(msg + " = [" + msgVar + "]");
}

function roundToNearestEighth(power) {
    retval = "";
    if(power > 0) {
        retval = "+";
    }
    retval = retval + ((Math.round(power * 8) / 8).toFixed(2));
    lastchar = parseInt(retval.charAt(retval.length - 1));
    if (lastchar == 8) {
        retval = retval.substr(0, (retval.length - 1)) + "7";
    }
    if(lastchar == 3) {
        retval = retval.substr(0, (retval.length - 1)) + "2";
    }
    return(retval);
}

function vertexPower(power) {
    retval = power;
    if (Math.abs(power) < 4) {
        retval = power;
    } else {
        retval = (power) / (1 - (0.012 * power));
//        retval = 1/((1/power) - 0.012);
    }
    return(retval);
}

function convertDtoMM(power) {
    retval = ((1.3375 - 1) / power) * 1000;
    return(retval);
}

function updateTable()
{
    // harvest the values from the table...
    odK1 = parseFloat(document.getElementById("kOD1").value);
    odK2 = parseFloat(document.getElementById("kOD2").value);
    odManSph = parseFloat(document.getElementById("manifestSphOD").value);
    odManCyl = parseFloat(document.getElementById("manifestCylOD").value);

    osK1 = parseFloat(document.getElementById("kOS1").value);
    osK2 = parseFloat(document.getElementById("kOS2").value);
    osManSph = parseFloat(document.getElementById("manifestSphOS").value);
    osManCyl = parseFloat(document.getElementById("manifestCylOS").value);

    // Now, do the calculations...
    odMaxK = Math.max(odK1, odK2);
    odMinK = Math.min(odK1, odK2);
    osMaxK = Math.max(osK1, osK2);
    osMinK = Math.min(osK1, osK2);
    odRxBC1 = odMinK - 0.25;
    odRxBC2 = odMaxK - 0.75;
    odRxBCmm1 = convertDtoMM(odRxBC1);
    odRxBCmm2 = convertDtoMM(odRxBC2);
    osRxBC1 = osMinK - 0.25;
    osRxBC2 = osMaxK - 0.75;
    osRxBCmm1 = convertDtoMM(osRxBC1);
    osRxBCmm2 = convertDtoMM(osRxBC2);
    odPowerCrossCyl = odManSph + odManCyl;
    osPowerCrossCyl = osManSph + osManCyl;
    // Need to vertex adjust the o?ManSph and o?PowerCrossCyl values...
    odSphVertex = vertexPower(odManSph);
    odCylVertex = vertexPower(odPowerCrossCyl);
    osSphVertex = vertexPower(osManSph);
    osCylVertex = vertexPower(osPowerCrossCyl);
    // Now, calculate final Rx Powers...
    odRx1 = odSphVertex + 0.25;
    odRx2 = odCylVertex + 0.75;
    osRx1 = osSphVertex + 0.25;
    osRx2 = osCylVertex + 0.75;


    // Now, update the table...
    document.getElementById("formODFlatK").innerHTML=odMinK.toFixed(2) + " D";
    document.getElementById("formODSteepK").innerHTML=odMaxK.toFixed(2) + " D";
    document.getElementById("rxODFlatK").innerHTML=odRxBC1.toFixed(2) + " D";
    document.getElementById("rxODSteepK").innerHTML=odRxBC2.toFixed(2) + " D";
    document.getElementById("formOSFlatK").innerHTML=osMinK.toFixed(2) + " D";
    document.getElementById("formOSSteepK").innerHTML=osMaxK.toFixed(2) + " D";
    document.getElementById("rxOSFlatK").innerHTML=osRxBC1.toFixed(2) + " D";
    document.getElementById("rxOSSteepK").innerHTML=osRxBC2.toFixed(2) + " D";
    document.getElementById("formODSph").innerHTML=roundToNearestEighth(odManSph) + " D";
    document.getElementById("formODSphCyl").innerHTML=roundToNearestEighth(odPowerCrossCyl) + " D";
    document.getElementById("formOSSph").innerHTML=roundToNearestEighth(osManSph) + " D";
    document.getElementById("formOSSphCyl").innerHTML=roundToNearestEighth(osPowerCrossCyl) + " D";
    document.getElementById("formODSphVertex").innerHTML=roundToNearestEighth(odSphVertex) + " D";
    document.getElementById("formODSphCylVertex").innerHTML=roundToNearestEighth(odCylVertex) + " D";
    document.getElementById("formOSSphVertex").innerHTML=roundToNearestEighth(osSphVertex) + " D";
    document.getElementById("formOSSphCylVertex").innerHTML=roundToNearestEighth(osCylVertex) + " D";
    document.getElementById("rxODPower1").innerHTML=roundToNearestEighth(odRx1) + " D";
    document.getElementById("rxODPower2").innerHTML=roundToNearestEighth(odRx2) + " D";
    document.getElementById("rxOSPower1").innerHTML=roundToNearestEighth(osRx1) + " D";
    document.getElementById("rxOSPower2").innerHTML=roundToNearestEighth(osRx2) + " D";
    document.getElementById("rxODPower1b").innerHTML=roundToNearestEighth(odRx1) + " D";
    document.getElementById("rxODPower2b").innerHTML=roundToNearestEighth(odRx2) + " D";
    document.getElementById("rxOSPower1b").innerHTML=roundToNearestEighth(osRx1) + " D";
    document.getElementById("rxOSPower2b").innerHTML=roundToNearestEighth(osRx2) + " D";
    document.getElementById("rxODFlatMM").innerHTML=odRxBCmm1.toFixed(3) + " mm";
    document.getElementById("rxODSteepMM").innerHTML=odRxBCmm2.toFixed(3) + " mm";
    document.getElementById("rxOSFlatMM").innerHTML=osRxBCmm1.toFixed(3) + " mm";
    document.getElementById("rxOSSteepMM").innerHTML=osRxBCmm2.toFixed(3) + " mm";
    
    // Generate some text for proposed "first" choices for lens...
    odText = "<p>OD has [" + (odMaxK - odMinK).toFixed(2) + " D] corneal astigmatism.";
    odText += "<br>OD has [" + Math.abs(odManCyl).toFixed(2) + " D] refractive astigmatism.";
    odText += "<p>Proposed parameters:";
    odText += "<br>Base Curve: " + odRxBCmm1.toFixed(3) + " mm / " + odRxBCmm2.toFixed(3) + " mm";
    odText += "<br>Powers : " + roundToNearestEighth(odRx1) + " D / " + roundToNearestEighth(odRx2) + " D";
    odText += "<br>Diameter: 9.4 mm (8.8 mm for non-lid-attachment fit)";
    odText += "<br>Material: ???";
    odText += "<br>Tint: Green Visitint";
    odText += "</p>";
    document.getElementById("odPropLens").innerHTML = odText;
    osText = "<p>OS has [" + (osMaxK - osMinK).toFixed(2) + " D] corneal astigmatism.";
    osText += "<br>OS has [" + Math.abs(osManCyl).toFixed(2) + " D] refractive astigmatism.";
    osText += "<p>Proposed parameters:";
    osText += "<br>Base Curve: " + osRxBCmm1.toFixed(3) + " mm / " + osRxBCmm2.toFixed(3) + " mm";
    osText += "<br>Powers : " + roundToNearestEighth(osRx1) + " D / " + roundToNearestEighth(osRx2) + " D";
    osText += "<br>Diameter: 9.4 mm (8.8 mm for non-lid-attachment fit)";
    osText += "<br>Material: ???";
    osText += "<br>Tint: Blue Visitint";
    osText += "</p>";
    document.getElementById("osPropLens").innerHTML = osText;   
}
