import $ from 'jquery';
import axios from 'axios';



$( document ).ready(() => {
    console.log('ready');
    $('#search__button').click(function(){
        
        const game__name = $('#search__input').val();
        console.log(game__name);
        if(game__name != ''){
            console.log(game__name);
            getGames(game__name, 10);
        }
    });
});



function getGames(gameName, amount){

    gameName = gameName.toLowerCase().split(' ').join('%20');

    const baseUrl = 'https://api.rawg.io/api/games';

    axios.get(`${baseUrl}?page_size=${amount}&search=${gameName}`)         
    .then( result => {
        createGamesList(result.data.results);            
    })  
    .catch((error) => {
        console.error(error);
    });  
}


function createGamesList(games) {
    console.log('inside Games List');
    console.log(games);
    let gamesList = '';

    games.forEach( game => {
    	gamesList += `
            <li> 
                <a href="detail.html?id=${game.id}">
                    <div class="game"> 
                        <div class="game__image">
                            <img src="${game.background_image}" alt="No Image Available">
                        </div>
                        <div class="game__title"> ${game.name} </div>
                        <div class="game__release"> ${game.released} </div>                    
                    </div>
                </a>
            </li>
         `;
    });

    $('#search__results').html(gamesList);
}

