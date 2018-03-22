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

function printNumWithSign(numToPrint) {
    rval = "";
    if(parseFloat(numToPrint) >= 0.00) {
        rval = "+" + numToPrint;
    } else {
        rval = numToPrint;
    }
    return(rval);
}

function updateTable()
{
    // harvest the values from the table...
    odSize = parseInt(document.querySelector('input[name="odSize"]:checked').value)
    osSize = parseInt(document.querySelector('input[name="osSize"]:checked').value)
    odK1 = parseFloat(document.getElementById("kOD1").value);
    odK2 = parseFloat(document.getElementById("kOD2").value);
    odManSph = parseFloat(document.getElementById("manifestSphOD").value);
    odManCyl = parseFloat(document.getElementById("manifestCylOD").value);
    odFlatKff = 0;
    odFlatDff = 0;
    odDiamRng = "";
    odSteepKff = 0;
    odSteepDff = 0;
    osDiamRng = "";
    switch (odSize) {
        case 0:
            odFlatKff = +0.25;
            odFlatDff = -0.25;
            odSteepKff = -0.50;
            odSteepDff = +0.50;
            odDiamRng = "8.0mm to 8.6mm";
            break;
        case 1:
            odFlatKff = 0.00;
            odFlatDff = 0.00;
            odSteepKff = -0.75;
            odSteepDff = +0.75;
            odDiamRng = "8.7mm to 9.3mm";
            break;
        case 2:
            odFlatKff = -0.25;
            odFlatDff = +0.25;
            odSteepKff = -1.00;
            odSteepDff = +1.00;
            odDiamRng = "9.4mm to 10.2mm";
            break;
    }

    osK1 = parseFloat(document.getElementById("kOS1").value);
    osK2 = parseFloat(document.getElementById("kOS2").value);
    osManSph = parseFloat(document.getElementById("manifestSphOS").value);
    osManCyl = parseFloat(document.getElementById("manifestCylOS").value);
    osFlatKff = 0;
    osFlatDff = 0;
    osSteepKff = 0;
    osSteepDff = 0;
    switch (osSize) {
        case 0:
            osFlatKff = +0.25;
            osFlatDff = -0.25;
            osSteepKff = -0.50;
            osSteepDff = +0.50;
            osDiamRng = "8.0mm to 8.6mm";
            break;
        case 1:
            osFlatKff = 0.00;
            osFlatDff = 0.00;
            osSteepKff = -0.75;
            osSteepDff = +0.75;
            osDiamRng = "8.7mm to 9.3mm";
            break;
        case 2:
            osFlatKff = -0.25;
            osFlatDff = +0.25;
            osSteepKff = -1.00;
            osSteepDff = +1.00;
            osDiamRng = "9.4mm to 10.2mm";
            break;
    }
    // Now, do the calculations...
    odMaxK = Math.max(odK1, odK2);
    odMinK = Math.min(odK1, odK2);
    osMaxK = Math.max(osK1, osK2);
    osMinK = Math.min(osK1, osK2);
    odRxBC1 = odMinK + odFlatKff;
    odRxBC2 = odMaxK + odSteepKff;
    odRxBCmm1 = convertDtoMM(odRxBC1);
    odRxBCmm2 = convertDtoMM(odRxBC2);
    osRxBC1 = osMinK + osFlatKff;
    osRxBC2 = osMaxK + osSteepKff;
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
    odRx1 = odSphVertex + odFlatDff;
    odRx2 = odCylVertex + odSteepDff;
    osRx1 = osSphVertex + osFlatDff;
    osRx2 = osCylVertex + osSteepDff;


    // Now, update the table...
    //4. Enter K:
    document.getElementById("formODFlatK").innerHTML=odMinK.toFixed(2) + " D";
    document.getElementById("formODSteepK").innerHTML=odMaxK.toFixed(2) + " D";
    document.getElementById("formOSFlatK").innerHTML=osMinK.toFixed(2) + " D";
    document.getElementById("formOSSteepK").innerHTML=osMaxK.toFixed(2) + " D";

    //5. Enter Spectacle Power:
    document.getElementById("formODSph").innerHTML=roundToNearestEighth(odManSph) + " D";
    document.getElementById("formODSphCyl").innerHTML=roundToNearestEighth(odPowerCrossCyl) + " D";
    document.getElementById("formOSSph").innerHTML=roundToNearestEighth(osManSph) + " D";
    document.getElementById("formOSSphCyl").innerHTML=roundToNearestEighth(osPowerCrossCyl) + " D";

    //6. Vertex Adjust Line 5:
    document.getElementById("formODSphVertex").innerHTML=roundToNearestEighth(odSphVertex) + " D";
    document.getElementById("formODSphCylVertex").innerHTML=roundToNearestEighth(odCylVertex) + " D";
    document.getElementById("formOSSphVertex").innerHTML=roundToNearestEighth(osSphVertex) + " D";
    document.getElementById("formOSSphCylVertex").innerHTML=roundToNearestEighth(osCylVertex) + " D";

    //7. Insert Fit Factor:
    document.getElementById("odfkff").innerHTML=printNumWithSign(odFlatKff.toFixed(2)) + " D";
    document.getElementById("odsphereff").innerHTML=printNumWithSign(odFlatDff.toFixed(2)) + " D";
    document.getElementById("odskff").innerHTML=printNumWithSign(odSteepKff.toFixed(2)) + " D";
    document.getElementById("odsphcylff").innerHTML=printNumWithSign(odSteepDff.toFixed(2)) + " D";
    document.getElementById("osfkff").innerHTML=printNumWithSign(osFlatKff.toFixed(2)) + " D";
    document.getElementById("ossphereff").innerHTML=printNumWithSign(osFlatDff.toFixed(2)) + " D";
    document.getElementById("osskff").innerHTML=printNumWithSign(osSteepKff.toFixed(2)) + " D";
    document.getElementById("ossphcylff").innerHTML=printNumWithSign(osSteepDff.toFixed(2)) + " D";

    //8. Final CL Rx:
    document.getElementById("rxODFlatK").innerHTML=odRxBC1.toFixed(2) + " D";
    document.getElementById("rxODSteepK").innerHTML=odRxBC2.toFixed(2) + " D";
    document.getElementById("rxOSFlatK").innerHTML=osRxBC1.toFixed(2) + " D";
    document.getElementById("rxOSSteepK").innerHTML=osRxBC2.toFixed(2) + " D";
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
    odText += "</p>";
    odText += "<p>Proposed parameters:";
    odText += "<br>Base Curve: " + odRxBCmm1.toFixed(3) + " mm / " + odRxBCmm2.toFixed(3) + " mm";
    odText += "<br>Powers : " + roundToNearestEighth(odRx1) + " D / " + roundToNearestEighth(odRx2) + " D";
    odText += "<br>Diameter: " + odDiamRng;
    odText += "<br>Material: ???";
    odText += "<br>Tint: Green Visitint";
    odText += "</p>";
    odText += "<p>Notes:";
    odText += "<br>Difference in Lens Power: " + Math.abs(odRx1 - odRx2).toFixed(2);
    odText += "<br>Difference in Lens Base Curve: " + Math.abs(odRxBC1 - odRxBC2).toFixed(2);
    if (Math.abs(Math.abs(odRx1 - odRx2) - Math.abs(odRxBC1 - odRxBC2)) < 0.0001) {
        odText += "<br>&emsp;This is a <b>spherical power effect (SPE)</b> lens.  Rotation of lens will not induce blur.";
    } else {
        odText += "<br>&emsp;This is a <b>cylinder power effect (CPE)</b> lens.  Rotation of lens <b>WILL</b> induce blur.";
        odText += "<br><ul><li>Make sure you have at least 2.00D of toricity in the lens base curves.<li>Make sure at least 2/3 of the corneal toricity is in the base curve of the lens.<li>Changes in base curve require power changes too.</ul>";
    }
    odText += "</p>";
    document.getElementById("odPropLens").innerHTML = odText;
    osText = "<p>OS has [" + (osMaxK - osMinK).toFixed(2) + " D] corneal astigmatism.";
    osText += "<br>OS has [" + Math.abs(osManCyl).toFixed(2) + " D] refractive astigmatism.";
    osText += "</p>";
    osText += "<p>Proposed parameters:";
    osText += "<br>Base Curve: " + osRxBCmm1.toFixed(3) + " mm / " + osRxBCmm2.toFixed(3) + " mm";
    osText += "<br>Powers : " + roundToNearestEighth(osRx1) + " D / " + roundToNearestEighth(osRx2) + " D";
    osText += "<br>Diameter: " + osDiamRng;
    osText += "<br>Material: ???";
    osText += "<br>Tint: Blue Visitint";
    osText += "</p>";
    osText += "<p>Notes:";
    osText += "<br>Difference in Lens Power: " + Math.abs(osRx1 - osRx2).toFixed(2);
    osText += "<br>Difference in Lens Base Curve: " + Math.abs(osRxBC1 - osRxBC2).toFixed(2);
    if (Math.abs(Math.abs(osRx1 - osRx2) - Math.abs(osRxBC1 - osRxBC2)) < 0.0001) {
        osText += "<br>&emsp;This is a <b>spherical power effect (SPE)</b> lens.  Rotation of lens will not induce blur.";
    } else {
        osText += "<br>&emsp;This is a <b>cylinder power effect (CPE)</b> lens.  Rotation of lens <b>WILL</b> induce blur.";
        osText += "<br><ul><li>Make sure you have at least 2.00D of toricity in the lens base curves.<li>Make sure at least 2/3 of the corneal toricity is in the base curve of the lens.<li>Changes in base curve require power changes too.</ul>";
    }
    osText += "</p>";
    document.getElementById("osPropLens").innerHTML = osText;   
}
