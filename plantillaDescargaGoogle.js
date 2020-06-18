// VARIBALES GLOBALES
var base_time = 500; // Minimum wait time
var increment = 500; // Amount of time to be incremented by
var max_multiplier=15; // Maximum multiplier to be hold
var success_min_count = 5; // Minimum amount of succesful rounds to consider decreasing the multiplier
var success_count = 0; // Number of continued succesful rounds
var multiplier = 0; //multiplier of increment
var counter=0;  // General round counter
var out_list = [];
var in_list = [ // Array where to provide the input
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2597000,-5.70195000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.0286500,-6.21951000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2755220,-5.40813800",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.9378600,-6.36065000",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.8594600,-6.36509000"
    ];

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
                        }catch(err){
                            success_count=0;
                            if (multiplier < max_multiplier){
                                multiplier++;
                                t_new=base_time + multiplier *increment;
                                console.log(err.message + " - se incrementa el tiempo a " + t_new + " con el multiplier a " + multiplier);
                            }else{
                                console.log(err.message + " - no se puede incrementar el tiempo.")
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
        console.log("");
        console.log("Printing result in new window...")
        var new_window = window.open();
        new_window.document.writeln("<html lang='es'><head><meta charset='utf-8'></head><body>");
        new_window.document.writeln("ID;URL;TITLE;INFO<br/>");
        for (i = 0; i < out_list.length; i++) {
            new_window.document.writeln(out_list[i] + "<br/>");
        }
        new_window.document.writeln("</body></html>");
    };
};
solve();