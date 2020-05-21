// cari
// $(".search-button").on("click", function () {
  
//     $.ajax({
//         url : 'http://www.omdbapi.com/?apikey=cf612af4&s=' + $(".input-keyword").val(),
//         success : results => {
//             const movies = results.Search;
    
//             let cards ="";
//             movies.forEach (m => {
//                 cards += `<div class="col-md-4 my-3">
//                                 <div class="card" style="width: 18rem;">
//                                 <img src="${m.Poster}" class="card-img-top" >
//                                 <div class="card-body">
//                                     <h5 class="card-title">${m.Title}</h5>
//                                     <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
//                                     <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#exampleModal" data-imdbid="${m.imdbID}">Deatil</a>
//                                 </div>
//                                 </div>
//                             </div>`;
//             });
    
//             $(".movie-container").html(cards);
    
//             // ketika tombol detail di klik
//             $(".modal-detail-button").on("click", function () {
//                 $.ajax({
//                     url :  'http://www.omdbapi.com/?apikey=cf612af4&i='+ $(this).data("imdbid"),
//                     success : m => {
//                         const movieDeatil = ` <div class="container-fluid">
//                                                     <div class="row">
//                                                     <div class="col-md-3">
//                                                         <img src="${m.Poster}" class="img-fluid">
//                                                     </div>
                                    
//                                                     <div class="col-md">
//                                                         <ul class="list-group">
//                                                         <li class="list-group-item">${m.Title}</li>
//                                                         <li class="list-group-item">${m.Year}</li>
//                                                         <li class="list-group-item">${m.Director}</li>
//                                                         <li class="list-group-item">${m.Actors}</li>
//                                                         <li class="list-group-item">${m.Writer}</li>
//                                                         </ul>
//                                                     </div>
//                                                     </div>
//                                                 </div>`;
    
//                              $(".modal-body").html(movieDeatil);                   
//                     },
//                     error : (e) => {
//                         // jika eror
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error : (e) => {
//             // jika eror
//             console.log(e.responseText);
//         } 
//     });
// });

// pake fetch
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", function () {

    const inputKeyword = document.querySelector(".input-keyword");
    fetch("http://www.omdbapi.com/?apikey=cf612af4&s=" + inputKeyword.value)
       .then(response => response.json())   //bentuk masih promise
       .then(response => {
           const movies = response.Search;
           let cards = "";

           movies.forEach (m => cards += showCards(m));

           const movieContainer = document.querySelector(".movie-container");
           movieContainer.innerHTML = cards;


        //    ketika tombol detail di klik
        const modalDetailButton = document.querySelectorAll(".modal-detail-button");
        modalDetailButton.forEach (btn => {
            btn.addEventListener("click", function (){
                const imdbid = this.dataset.imdbid;
                fetch("http://www.omdbapi.com/?apikey=cf612af4&i=" + imdbid)
                   .then(response => response.json())
                   .then( m => {
                        const movieDetail = showMovieDetail(m);
                        const modalBody = document.querySelector(".modal-body");
                        modalBody.innerHTML = movieDetail;
                   });
            });

        });
       });  //bentuknya objek
});



function showCards (m){
  return `
  <div class="col-md-4 my-3">
                                  <div class="card" style="width: 18rem;">
                                  <img src="${m.Poster}" class="card-img-top" >
                                  <div class="card-body">
                                      <h5 class="card-title">${m.Title}</h5>
                                      <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                      <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#exampleModal" data-imdbid="${m.imdbID}">Detail</a>
                                  </div>
                                  </div>
                              </div>
  `;
}


function showMovieDetail (m){
   return `
   <div class="container-fluid">
                                                       <div class="row">
                                                       <div class="col-md-3">
                                                           <img src="${m.Poster}" class="img-fluid">
                                                       </div>
                                       
                                                       <div class="col-md">
                                                           <ul class="list-group">
                                                           <li class="list-group-item">${m.Title}</li>
                                                           <li class="list-group-item">${m.Year}</li>
                                                           <li class="list-group-item">${m.Director}</li>
                                                           <li class="list-group-item">${m.Actors}</li>
                                                           <li class="list-group-item">${m.Writer}</li>
                                                           </ul>
                                                       </div>
                                                       </div>
                                                   </div>
   `;
}