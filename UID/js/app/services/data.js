angular.module('ninjaApp')
    .service('userData', function(){
        this.users = [];
    })
    .service('techniqueData', function(){
        this.techniques = [];
    })
    .service('levelsData', function(){
        this.levels = [
            { "title": "9th-kyu", "description": "Deflections, Stances, Elements, Jutai jutsu" },
            { "title": "8th-kyu", "description": "Atemi Jutsu , Kicks, Jutai Jutsu" },
            { "title": "7th-kyu", "description": "Takedowns, Locks, Jutai Jutsu" },
            { "title": "6th-kyu", "description": "Body-holds, Pain Compliance, Gun Hold-ups" },
            { "title": "5th-kyu", "description": "Knife defence, Ninja Keyring" },
            { "title": "4th-kyu", "description": "Jojutsu (Short stick), Tonfa PR24" },
            { "title": "3rd-kyu", "description": "Hanbojutsu (Med Staff), Kali" },
            { "title": "2nd-kyu", "description": "Nunchaku and Belt Work (Chain)" },
            { "title": "1st-kyu", "description": "Single Arm fighting and Ninjato (Katas)" }
        ]
    })
    .service('coursesData', function(){
        this.courses = ["sai", "kukri", "archery", "grappling" ];
    });
