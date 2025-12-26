/*
This script handles 3D switches of all the layers in the comp.
*/

function makeLayers3Dor2D(whichD) {
    var activeComp = app.project.activeItem;
    if (!activeComp || !(activeComp instanceof CompItem)) {
        alert("No active Composition Found!");
        return;
    }

    selectedLayers = activeComp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("No Layer is Selected!");
        return;
    }

    app.beginUndoGroup("Renaming Layers");
    for(var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        var prevName = layer.name;
        if (prevName.indexOf("3d_") === 0 || prevName.indexOf("2d_") === 0) {
            layer.name = whichD + prevName.slice(3);
        }
        else {
            layer.name = whichD + prevName;
        }
        layer.threeDLayer = whichD === "3d_" ? true : false;
    }
    app.endUndoGroup();
}

function createUI(thisObj) {
    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dimension Switcher");

    myPanel.orientation = "column";
    myPanel.alignChildren = ["left", "top"];

    var groupSwitch = myPanel.add("group");
    groupSwitch.orientation = "row";
    var btnSwitchTo3D = groupSwitch.add("button", undefined, "Make All 3D");
    var btnSwitchTo2D = groupSwitch.add("button", undefined, "Make All 2D");

    btnSwitchTo3D.onClick = function() { makeLayers3Dor2D("3d_")}
    btnSwitchTo2D.onClick = function() { makeLayers3Dor2D("2d_")}

    myPanel.layout.layout(true);
    return myPanel;
}

var myScriptPanel = createUI(this);
