var the_list = [
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2597000,-5.70195000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.0286500,-6.21951000",
    "https://www.google.es/maps/dir/38.2645700,-5.86491000/38.2755220,-5.40813800",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.9378600,-6.36065000",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.8594600,-6.36509000",
    "https://www.google.es/maps/dir/38.6871500,-6.41911000/38.9385000,-6.36552000",
    "https://www.google.es/maps/dir/38.2597000,-5.70195000/38.2755220,-5.40813800",
    "https://www.google.es/maps/dir/38.2597000,-5.70195000/38.2127900,-5.14101000",
    "https://www.google.es/maps/dir/38.8787700,-6.94602000/38.8847100,-7.02224000",
    "https://www.google.es/maps/dir/38.8787700,-6.94602000/38.8836110,-6.99735900",
    "https://www.google.es/maps/dir/38.8847100,-7.02224000/38.8836110,-6.99735900",
    "https://www.google.es/maps/dir/39.0514000,-5.64921000/39.1410200,-5.93146000",
    "https://www.google.es/maps/dir/39.0514000,-5.64921000/39.4111900,-5.89079000",
    "https://www.google.es/maps/dir/38.0286500,-6.21951000/37.9043200,-6.22098000",
    "https://www.google.es/maps/dir/38.9378600,-6.36065000/38.8594600,-6.36509000",
    "https://www.google.es/maps/dir/38.9378600,-6.36065000/38.9385000,-6.36552000",
    "https://www.google.es/maps/dir/38.9378600,-6.36065000/39.1623900,-6.26421000",
    "https://www.google.es/maps/dir/38.9378600,-6.36065000/39.3824800,-6.34811000",
    "https://www.google.es/maps/dir/38.9378600,-6.36065000/39.1410200,-5.93146000",
    "https://www.google.es/maps/dir/38.8594600,-6.36509000/38.9385000,-6.36552000"
    ];

// VARIBALES GLOBALES
var base_time = 500; // Es el tiempo mínimo de espera
var increment = 500; //
var max_multiplier=8; //
var success_min_count = 5; // Conteo de éxitos mínimo para reducir nivel
var success_count = 0;
var multiplier = 0; //multiplier de base_time
var counter=0;  // Empieza aquí (cero por defecto)

function solve (){
    if (counter < the_list.length){
        if (success_count >= success_min_count){
            if (multiplier > 0){
                multiplier--;
                console.log("Se reduce el multiplier a " + multiplier);
            }
        }
        var potato = window.open(the_list[counter]); 
        setTimeout(	function(){ 
                        try{
                            console.log("ID:" + counter + "ÑÑ" + "URL:" + the_list[counter] + "ÑÑ" + "TITLE:" + potato.document.title + "ÑÑ" + "INFO:" + potato.document.getElementsByClassName("section-directions-trip-numbers")[0].textContent + "ÑÑ");
                        }catch(err){
                            if (multiplier < max_multiplier){
                                multiplier++;
                                t_new=base_time + multiplier *increment;
                                console.log(err.message + " - se incrementa el tiempo a " + t_new + " con el multiplier a " + multiplier);
                            }
                            counter--;
                        }
                        potato.close();
                        counter++;
                        solve();
                    }
                    , base_time + multiplier *increment
        );
    };	
    if (counter == the_list.length){
        console.log("");
        console.log("");
        console.log("FINISHED!");
        console.log("");
    };
};
solve();