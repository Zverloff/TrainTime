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
var currentTime = (moment().format("HH:mm"))
console.log(currentTime)

$("#submitButton").on("click", function() { 
    trainName = $("#tName").val().trim()
    dest = $("#tDest").val().trim()
    firstTime = $("#tTime").val().trim(), 
    freq = $("#tFreq").val().trim()

    firstTimeConverted = moment(firstTime, "hh:mm");
    currentTime = moment();
    timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    remain = timeDiff % freq;
    minutesAway = freq - remain;
    nextTrain = moment().add(minutesAway, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");
    

    database.ref().push({
        trainName: trainName,
        dest: dest,
        firstTime: firstTime,
        freq: freq,
        minutesAway: minutesAway,
        nextTrainFormatted: nextTrainFormatted,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });       
})
database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    var sv = snapshot.val()


    var newRow = $("<tr>")
    var newName = $("<td>").text(sv.trainName)
    var newDest = $("<td>").text(sv.dest)
    var newArrival = $("<td>").text(sv.nextTrainFormatted)
    var newFreq = $("<td>").text(sv.freq)
    var newAway = $("<td>").text(sv.minutesAway)
    

    newRow.append(newName).append(newDest).append(newFreq).append(newArrival).append(newAway)
    $("#tableBody").append(newRow)
})