// https://api.themoviedb.org/3/trending/all/day?api_key=20765ae7b31345b32c5d2679fb836627
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg



// ========== global =========
const searchInput = document.querySelector(".input-group input");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal img"); 
const modalTitle = document.querySelector(".modal h5"); 
const modaldetails = document.querySelector(".modal p");
const modalInfo = document.querySelectorAll(".modal table tr td:last-child");
let box = [];


// ========== start =========
searchBtn();
getData("https://api.themoviedb.org/3/trending/all/day?api_key=20765ae7b31345b32c5d2679fb836627");

$(".close").click(function(e){
    modal.classList.remove("d-block");
});

searchInput.addEventListener('input',function(){
    if(this.value.trim() !== ""){
        getData(`https://api.themoviedb.org/3/search/movie?api_key=20765ae7b31345b32c5d2679fb836627&query=${this.value}`);
    }
});






// ========== function =========

function searchBtn(){
    $("#button-addon2").click(function(){
        $(".input-group input").addClass("active");
        searchInput.focus();
    });

    searchInput.addEventListener('blur',(e)=>{
        e.preventDefault();
        searchInput.classList.remove("active");
    });
};


async function getData(url){
    let data = await fetch(url);
    let dataJson = await data.json();
    box = dataJson.results;
    if(data.status == 200){
        display(dataJson.results);
    }

};

function display(data){
    var result ="";
    for(let i=0 ; i<data.length ; i++){
        if(box[i].poster_path !== null){
            result += `<div class="col-md-6 col-lg-4">
            <div class="card border-0 rounded-0 h-100">
                <div class="image flex-grow-1">
                    <img src="https://image.tmdb.org/t/p/w500/${box[i].poster_path}" class="card-img-top  rounded-0" alt="...">
                </div>
                <div class="card-body flex-grow-0">
                  <h5 class="card-title text-white text-truncate">${data[i].name || data[i].title}</h5>
                  <a onclick="details(${i})" class="btn btn-primary mt-4">Details</a>
                </div>
              </div>
        </div>`;
        }
    };
    document.querySelector(".main .row").innerHTML = result;
};




function details(index){
    modal.classList.add("d-block");
    if(box[index].backdrop_path == null){
        $(".modal img").remove();
    }else{
        modalImg.setAttribute("src","https://image.tmdb.org/t/p/w500/" + box[index].backdrop_path);
    };
    modalTitle.innerHTML = box[index].name || box[index].title || box[index].original_title;
    modaldetails.innerHTML = box[index].overview;
    modalInfo[0].innerHTML = box[index].first_air_date || box[index].release_date;
    modalInfo[1].innerHTML = box[index].vote_average;
    modalInfo[2].innerHTML = box[index].vote_count;
    modalInfo[3].innerHTML =  box[index].adult == true?"yes":"no";
    modalInfo[04].innerHTML = box[index].original_language;
}

