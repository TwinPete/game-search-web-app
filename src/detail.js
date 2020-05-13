import $ from 'jquery';
import axios from 'axios';


getGameDetail();

function getGameDetail(){

    let gameId = parseInt(getUrlVars());
    console.log('url');
    console.log(gameId);

    const baseUrl = 'https://api.rawg.io/api/games';
    const finalUrl = `${baseUrl}/${gameId}`;
    console.log(finalUrl);

    axios.get(`${finalUrl}`)         
    .then( result => {
        createDetail(result.data);                
    })  
    .catch((error) => {
        console.error(error);
    });  
}

function createDetail(gameDetail){

    console.log('inside game detail function');
    let gameDetailMedia;
    if(gameDetail && gameDetail.clip){
        gameDetailMedia = `<video src="${gameDetail.clip.clip}" autoplay loop muted align="right" alt="">`;
    } else {
        gameDetailMedia = `<img src="${gameDetail.background_image}" alt="No Image Available">`;
    }

    gameDetail.platforms.forEach(item => {
        console.log(item);
    });


    const detail = `<div class="detail__body">
            <div class="detail__top">
                <div class="detail__stats">
                    <div class="detail__title">${gameDetail.name}</div>
                    <div class="detail__stat detail__releaseDate">
                    <span class="detail__label">Release Date:</span>
                    <span class="detail__value">${gameDetail.released}</span>
                    </div>
                    <div class="detail__stat detail__rating">
                    <span class="detail__label">Rating:</span>
                    <span class="detail__value">${gameDetail.rating}</span>
                    </div>
                    <div class="detail__stat detail__Genre">
                    <span class="detail__label">Genre:</span>
                    <span class="detail__value"><ul>${createGenreList(gameDetail.genres)}</ul></span>
                    </div>
                    <div class="detail__stat detail__platform">
                    <span class="detail__label">Platform:</span>
                    <span class="detail__value"><ul>${createPlaformsList(gameDetail.platforms)}</ul></span>
                    </div>
                    <div class="detail__description">
                        ${gameDetail.description}
                    </div>
                </div>
                <div class="detail__image">
                    ${gameDetailMedia}
                </div>
            </div>
        </div>`;

    $('#detail').html(detail);
}

function getUrlVars() {
    let vars = {};
    const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars.id;
}

function createPlaformsList(platforms){
    let list = '';

    if(platforms){
        platforms.forEach((platform, index) => {
            console.log(index);
            index === platforms.length - 1 ? list += `<li>${platform.platform.name}</li>` : list += `<li>${platform.platform.name},</li>`;
        });
    }

    return list;
}

function createGenreList(genres){
    let list = '';

    if(genres){
        genres.forEach((genre, index) => {
            index === list.length -1 ? list += `<li>${genre.name}</li>` : list += `<li>${genre.name},</li>`;
        });
    }

    return list;
}