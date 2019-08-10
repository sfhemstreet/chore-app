import React from 'react';

const randomQuote = () => {
    const quotes = [
        <div>"Cleanliness becomes more important when godliness is unlikely."
        <div>P. J. O'Rourke</div></div>,
    
        <div>"One, who maintains cleanliness keeps away diseases."
        <div>Sam Veda</div></div>,
    
        <div>"What separates two people most profoundly is a different sense and degree of cleanliness."     
        <div>Friedrich Nietzsche</div></div>,
    
        <div>"Cleanliness in the cat world is usually a virtue put above godliness."     
        <div>Carl Van Vechten</div></div>,
    
        <div>"The objective of cleaning is not just to clean, but to feel happiness living within that environment."     
        <div>Marie Kondo</div></div>,
    
        <div>"Don't call the world dirty because you forgot to clean your glasses."
        <div>Aaron Hill</div></div>,
    
        <div>"My second favorite household chore is ironing. My first being hitting my head on the top bunk bed until I faint."  
        <div>Erma Bombeck</div></div>,
    
        <div>"I'm not going to vacuum until Sears makes one you can ride on." 
        <div>Roseanne Barr</div></div>,
    
        <div>"My idea of superwoman is someone who scrubs her own floors."
        <div>Bette Midler</div></div>,
    
        <div>"Few tasks are more like the torture of Sisyphus than housework, with its endless repetition: the clean becomes soiled, the soiled is made clean, over and over, day after day. "
        <div>Simone de Beauvoir</div></div>,
    
        <div>"Dust is a protective coating for fine furniture." 
        <div>Mario Buatta</div></div>,
    
        <div>"Have you ever taken anything out of the clothes basket because it had become, relatively, the cleaner thing?" 
        <div>Katherine Whitehorn</div></div>,
    
        <div>"Housekeeping ain't no joke." 
        <div>Louisa May Alcott</div></div>,
    
        <div>"Housekeeping is like being caught in a revolving door." 
        <div>Marcelene Cox</div></div>,
    
        <div>"If your house is really a mess and a stranger comes to the door, greet him with, 'Who could have done this? We have no enemies.'" 
        <div>Phyllis Diller</div></div>,
    
        <div>"I hate housework. You make the beds, you wash the dishes and six months later you have to start all over again."
        <div>Joan Rivers</div></div>,
    
        <div>"Have a place for everything and keep the thing somewhere else; this is not a piece of advice, it is merely a custom." 
        <div>Mark Twain</div></div>,
    
        <div>"Housework can't kill you, but why take a chance?"
        <div>Phyllis Diller</div></div>
    ];

    return quotes[Math.floor(Math.random() * (quotes.length - 1))]

}

export default randomQuote;