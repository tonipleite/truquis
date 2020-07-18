// GLOBAL VARIABLES
var base_time = 500; // Minimum wait time
var increment = 500; // Amount of time to be incremented by
var max_multiplier=20; // Maximum multiplier to be hold. max_multiplier * increment + base_time will be the maximum amount of time to wait for one record
var success_min_count = 4; // Minimum amount of succesful rounds to consider decreasing the multiplier
var number_parachutes = 1; // For when there's an error in the retrieval
var success_count = 0; // Number of continued succesful rounds
var multiplier = 0; //multiplier of increment
var counter=0;  // General round counter
var remaining_time=10; // Every amount of rounds indicated in this variable it'll inform of how much time is left (estimated)
var d = new Date();
var time_0=d.getTime(); // Used to measure estimated remaining time
var out_list = []; // Output array 
var header = "ID;URL;TITLE;INFO";  // This is the header of the output table
var in_list = [ // Array where to provide the input of URLs
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2597000,-5.70195000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.0286500,-6.21951000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2755220,-5.40813800",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.9378600,-6.36065000",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.8594600,-6.36509000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2597000,-5.70195000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.0286500,-6.21951000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2755220,-5.40813800",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.9378600,-6.36065000",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.8594600,-6.36509000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2597000,-5.70195000"
    ];
var b_output_table = 1; // 1 | 0 whether to produce a csv output at the end of the execution or not
var b_output_html  = 1; // 1 | 0 whether to produce an html output at the end of the execution or not

// SIDE FUNCTIONS
function msToTime(s) { //https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    return hrs + 'h ' + mins + 'min ' + secs + 'sec';
}

function download(filename, text) { // Taken from https://gist.github.com/liabru/11263260, CesMak
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}

// MAIN FUNCTION
function solve (){
    if (counter < in_list.length){
        if (success_count >= success_min_count){
            if (multiplier > 0){
                multiplier--;
                success_count=0;
                console.log("Multiplier reduced by 1 to " + multiplier);
            }
        }
        var new_window = window.open(in_list[counter]); 
        setTimeout(	function(){ 
                        try{
                            //console.log("ID:" + counter + "ÑÑ" + "URL:" + in_list[counter] + "ÑÑ" + "TITLE:" + new_window.document.title + "ÑÑ" + "INFO:" + new_window.document.getElementsByClassName("section-directions-trip-numbers")[0].textContent + "ÑÑ");
                            out_list [counter] = counter + ";\"" +  in_list[counter] + "\";\""  + new_window.document.title + "\";\""  + new_window.document.getElementsByClassName("section-directions-trip-numbers")[0].textContent + "\""; 
                            success_count++;
                            number_parachutes=1;
                        }catch(err){
                            if (number_parachutes==0){
                                success_count=0;
                                if (multiplier < max_multiplier){
                                    multiplier++;
                                    t_new=base_time + multiplier *increment;
                                    console.log(err.message + " - witing time increased to " + t_new + " using multiplier of level " + multiplier);
                                }else{
                                    console.log(err.message + " - time increase not allowed.")
                                }
                            }else{
                                number_parachutes=0;
                                console.log ("Parachute!");
                            }
                            counter--;
                        }
                        new_window.close();
                        counter++;
                        solve();
                    }
                    , base_time + multiplier *increment // The waiting time for the next round
        );
    };	
    if (counter == in_list.length){ // When rounds are finished
        console.log("");
        console.log("");
        console.log("Source retrieval concluded!");
        if (b_output_html) {
            console.log("");
            console.log("Printing result in new window...")
            var new_window = window.open();
            new_window.document.writeln("<html lang='es'><head><meta charset='utf-8'></head><body>");
            new_window.document.writeln(header + "<br/>");
            for (i = 0; i < out_list.length; i++) {
                new_window.document.writeln(out_list[i] + "<br/>");
            }
            new_window.document.writeln("</body></html>");
        }
        if (b_output_table) {
            console.log("");
            console.log("Creating output CSV file...")
            file_string = header + "\u000D\u000A";
            for (i = 0; i < out_list.length; i++) {
                file_string= file_string +  out_list[i] + "\u000D\u000A";
            }
            download("G-Data.csv",file_string);
        }       
    }else{
        if (counter > 0 && counter % remaining_time == 0){
            var d = new Date();
            k = d.getTime() - time_0;
            k_remain = (k / counter) * (in_list.length-counter); //miliseconds remaining
            console.log("Still remaining: " + msToTime(k_remain));
        };
    };
};
solve();