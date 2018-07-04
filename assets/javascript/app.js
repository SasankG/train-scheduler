//Current Time
function liveTime() {
    $("#showTime").text(moment().format('h:mm:ss a'));
}
setInterval(liveTime, 1000);

//Set Firebase
var config = {
        apiKey: "AIzaSyDFCMF2v8u9jRFWi5Q6Dku-8s7q4tnFQFI",
        authDomain: "project-c8fbf.firebaseapp.com",
        databaseURL: "https://project-c8fbf.firebaseio.com",
        projectId: "project-c8fbf",
        storageBucket: "project-c8fbf.appspot.com",
        messagingSenderId: "967396058521"
        };
        
        firebase.initializeApp(config);

        var database = firebase.database();
     
         $("#add-user").on("click", function(event) {
           event.preventDefault();
           var name = $("#name-input").val().trim();
           var place = $("#place-input").val().trim();
           var time = $("#time-input").val().trim();
           var frequency = $("#frequency-input").val().trim();
           
             var timeConv = moment(time, "hh:mm").subtract(1, "years");
             var diffTime = moment().diff(moment(timeConv), "minutes");
             var remainder = diffTime % frequency;
             var left = diffTime % frequency;
             var minAway = frequency - remainder;
             var nextTrain = moment().add(minAway, "minutes");
             var finalTime = moment(nextTrain).format("hh:mm a");
        
        database.ref().push({
            name: name,
            place: place,
            time: time,
            frequency: frequency,
            minAway: minAway,
            finalTime: finalTime,
            dateAdded: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
            database.ref().on("child_added", function(snapshot){
           console.log(snapshot.val().name);
             $("#myTable").find("tbody").append($('<tr>').append($('<td>').append(snapshot.val().name)).append($("<td>").append(snapshot.val().place)).append($("<td>").append(snapshot.val().frequency)).append($("<td>").append(snapshot.val().finalTime)).append($("<td>").append(snapshot.val().minAway)))
        });
    });