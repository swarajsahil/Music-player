const ham=document.getElementById("ham");
const nav=document.getElementById("nav");
const dura=document.getElementById("dura");
const playBtn=document.getElementById("play-btn");
const smallBtn=document.getElementById("small-btn");
const nextBtn=document.getElementById("next-btn");
const prevBtn=document.getElementById("prev-btn");
const currTime=document.querySelector(".current-time");
const songPhoto=document.querySelector(".song-photo");
const songName=document.querySelector(".song-name");
const artistName=document.querySelector(".artist-name");
const repeat=document.querySelector(".repeat");
const myProgressBar = document.getElementById('myProgressBar');
const list=document.querySelectorAll(".card")
const volume=document.getElementById("vol");
let track_index=0;
let totalTime;
let rep=false;
let curr_track = document.createElement("audio");
ham.addEventListener("click",()=>{
        nav.classList.toggle("hide");
})

let track_list = [
  {
    name: "Apna bana le",
    artist: "	Arijit Singh & Sachin-Jigar",
    image:
      "https://pagalworldi.com/siteuploads/thumb/sft29/14055_4.jpg",
    path: "https://pagalworldi.com/files/download/id/14055",
  },
    {
      name: "Keshariya",
      artist: "Arjit singh",
      image:
        "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://pwdown.info/113639/Kesariya%20-%20Brahmastra.mp3",
    },
    {
      name: "Thoda Thoda Pyaar",
      artist: "Stebin Ben, Nilesh Ahuja",
      image:
        "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://pwdown.info/113514/Thoda%20Thoda%20Pyaar%20-%20Stebin%20Ben.mp3",
    },
    {
      name: "Ranjha",
      artist: "Arjit singh",
      image:
        "https://c.saavncdn.com/238/Shershaah-Original-Motion-Picture-Soundtrack--Hindi-2021-20210815181610-500x500.jpg",
      path: "https://pwdown.info/113558/Ranjha%20-%20Shershaah.mp3",
    },
    {
      name: "Teri Mitti",
      artist: "B Praak",
      image:
        "https://c.saavncdn.com/693/Kesari-Hindi-2019-20200605001133-500x500.jpg",
      path: "https://pagaliworld.com/files/download/id/7290",
    },
    {
      name: "Dil Tod Ke",
      artist: "B Praak, Rochak Kohli",
      image:
        "https://c.saavncdn.com/997/Dil-Tod-Ke-Hindi-2020-20200714234001-500x500.jpg",
      path: "https://pwdown.info/113462/Dil%20Tod%20Ke%20-%20B%20Praak.mp3",
    },
    {
      name: "Maan meri jaan",
      artist: "King",
      image:
        "https://hindipath.com/wp-content/uploads/2023/01/tu-maan-meri-jaan-lyrics.jpg",
      path: "https://www.pagalworld.com.se/files/download/id/64630",
    },
    {
      name: "Kahani suno 2.0",
      artist: "Kaifi khalil",
      image:
        "https://i.scdn.co/image/ab67616d0000b2734697d4ee22b3f63c17a3b9ec",
      path: "https://www.pagalworld.com.se/files/download/id/65497",
    }
  ];
  // start the music player
playBtn.addEventListener('click',loader);
smallBtn.addEventListener('click',loader);

// Adding default name in song list
songName.innerHTML="Apna bana le";
artistName.innerHTML="Arijit Singh & Sachin-Jigar";
// Adding song in curr_track
curr_track.src = track_list[track_index].path;
// function play and pause the song
function loader(){
  if(curr_track.paused || curr_track.currentTime<=0){
    playBtn.innerHTML=`<i class="fa-solid fa-circle-pause"></i>`;
    smallBtn.innerHTML=`<i class="fa-solid fa-circle-pause"></i>`;
      curr_track.play();
  }
  else{
      curr_track.pause();
      playBtn.innerHTML=`<i class="fa-solid fa-circle-play"></i>`;
      smallBtn.innerHTML=`<i class="fa-solid fa-circle-play"></i>`;
  }
  curr_track.addEventListener("ended",()=>{
    if(rep){
      curr_track.currentTime=0;
      curr_track.play();
    }
    else{
      nextTrack();
    }
  });
}
// function for change of song or Next song in the list
  function nextTrack() {
    curr_track.currentTime=0;
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;
    curr_track.src = track_list[track_index].path;
    songPhoto.src=track_list[track_index].image;
    songName.innerHTML=track_list[track_index].name;
    artistName.innerHTML=track_list[track_index].artist;
    loader();
    // playTrack();
  }
  // function for change of song or previous song in the list
  function prevTrack() {
    if (track_index > 0) track_index -= 1;
    else track_index = track_list.length;
    curr_track.src = track_list[track_index].path;
    songPhoto.src=track_list[track_index].image;
    songName.innerHTML="Name" + ": " + track_list[track_index].name;
    artistName.innerHTML=track_list[track_index].artist;
    loader();
    // playTrack();
  }


  // calling the eventlistener to play next song
  nextBtn.addEventListener("click",()=>{
    nextTrack();
  })
  // calling the eventlistener to play previous song
  prevBtn.addEventListener("click",()=>{
    prevTrack();
  })

  // set the current time and total duration of song
  curr_track.addEventListener('timeupdate',function (){
    let duration = curr_track.duration;
   let sec= new Number();
   let min= new Number();
   sec = Math.floor(curr_track.currentTime);    
   min = Math.floor( sec / 60 );
   min = min >= 10 ? min : '0' + min;    
   sec = Math.floor( sec % 60 );
   sec = sec >= 10 ? sec : '0' + sec;

   dura.innerHTML=Math.round(duration/60) + ':' + Math.round(duration%60);
   currTime.innerHTML=(min + ":" + sec);
   });

     // Listen to Events
curr_track.addEventListener('timeupdate', ()=>{ 
  // Update Seekbar
  progress = parseInt((curr_track.currentTime/curr_track.duration)* 100); 
  myProgressBar.value = progress;
})
// change the song and current time according to progress bar.
myProgressBar.addEventListener('change', ()=>{
  curr_track.currentTime = myProgressBar.value * curr_track.duration/100;
})
// Run song repeatedly
repeat.addEventListener("click",()=>{
  repeat.classList.toggle("change-color");
  rep=!rep;
})
// Increase song by 10 seconds
document.querySelector(".fa-forward").addEventListener("click",()=>{
let increaseTime=curr_track.currentTime;
increaseTime=increaseTime+10;
curr_track.currentTime=increaseTime;
// console.log(increaseTime);
})
// Decrease song by 10 seconds
document.querySelector(".fa-backward").addEventListener("click",()=>{
  let decreaseTime=curr_track.currentTime;
  decreaseTime=decreaseTime-10;
  curr_track.currentTime=decreaseTime;
  // console.log(increaseTime);
  })

  // volume of song
  vol.addEventListener("change",()=>{
    curr_track.volume=vol.value/100;
    // console.log(vol.value);
  })

// <i class="fa-solid fa-forward"></i>
// <i class="fa-solid fa-backward"></i>
  // let isPlaying=false;

  // function loadTrack(track_index){
  //   curr_track.src = track_list[track_index].path;
  //   curr_track.load();
  //   curr_track.addEventListener("ended", nextTrack);
  //     playPauseTrack();
      
  // }
  // function playPauseTrack(){
  //     if(!isPlaying)playTrack();
  //     else pauseTrack();
  // }
  // function playTrack(){
  //     curr_track.play();
  //     isPlaying=true;
  //     playBtn.innerHTML=`<i class="fa-solid fa-circle-pause"></i>`;
  //     }
  //   function pauseTrack(){
  //     curr_track.pause();
  //     isPlaying=false;
  //     playBtn.innerHTML=`<i class="fa-solid fa-circle-play"></i>`;
  //   }
    // function timer(){
    //   let duration=curr_track.currentTime;
    //   let sec= new Number();
    // let min= new Number();
    //  sec = Math.floor( duration );    
    //  min = Math.floor( sec / 60 );
    // min = min >= 10 ? min : '0' + min;    
    // sec = Math.floor( sec % 60 );
    // sec = sec >= 10 ? sec : '0' + sec;

    // // document.getElementById("dura")
    // currTime.innerHTML=min + ":" + sec;   //Id where i have to print the total duration of song.

    // } 
    // function timer(){
      // let currentMinutes = Math.floor(curr_track.currentTime / 60);
      // let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      // currTime.innerHTML=currentMinutes + ":" + currentSeconds;

    // }
    
  
    // function duratimer(){
    //   let currentMinutes = Math.floor(curr_track.duration / 60);
    //   let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    //   document.querySelector(".total-duration").innerHTML=currentMinutes + ":" + currentSeconds;
    //   // console.log(document.getElementById("dura"));
    // }

    // playBtn.addEventListener("click",()=>{
    //   loadTrack(track_index);
      // setInterval(timer,1000);
        // totalTime=Math.round(curr_track.duration/60) + ":" + Math.round((curr_track.duration))%60;
      
// })



  
