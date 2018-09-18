var config = {
    apiKey: "AIzaSyBe45MnbuDuYtUEkbxXjdVKNaT6k9gnjEc",
    authDomain: "example2-2cdff.firebaseapp.com",
    databaseURL: "https://example2-2cdff.firebaseio.com",
    projectId: "example2-2cdff",
    storageBucket: "example2-2cdff.appspot.com",
    messagingSenderId: "586439388577"
    };
firebase.initializeApp(config);
var database = firebase.database();

var trainName = "";
var dest = "";
var firstTime = "";
var currentTime = (moment().format("HH:mm"))
var ftConvert = ""
var timeDiff = ""
var remain = ""
var minutesAway = ""
var nextTrain = ""
var ntFormatted = ""



$("#submitButton").on("click", function() { 
    trainName = $("#tName").val().trim()
    dest = $("#tDest").val().trim()
    firstTime = $("#tTime").val().trim(), 
    freq = $("#tFreq").val().trim()

    ftConvert = moment(firstTime, "HH:mm");
    currentTime = moment().format("HH:mm");
    timeDiff = currentTime.diff(moment(ftConvert), "minutes");
    remain = timeDiff % freq;
    minutesAway = freq - remain;
    nextTrain = moment().add(minutesAway, "minutes");
    ntFormatted = moment(nextTrain).format("HH:mm");
    

    database.ref().push({
        trainName: trainName,
        dest: dest,
        firstTime: firstTime,
        freq: freq,
        minutesAway: minutesAway,
        ntFormatted: ntFormatted,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });       
})
database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    var sv = snapshot.val()


    var newRow = $("<tr>")
    var newName = $("<td>").text(sv.trainName)
    var newDest = $("<td>").text(sv.dest)
    var newArrival = $("<td>").text(sv.ntFormatted)
    var newFreq = $("<td>").text(sv.freq)
    var newAway = $("<td>").text(sv.minutesAway)
    

    newRow.append(newName).append(newDest).append(newFreq).append(newArrival).append(newAway)
    $("#tableBody").append(newRow)
})