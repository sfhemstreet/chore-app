const randomQuote = () => {
    const quotes = [
        `"Cleanliness becomes more important when godliness is unlikely."
        P. J. O'Rourke`,
    
        `"One, who maintains cleanliness keeps away diseases."
        Sam Veda`,
    
        `"What separates two people most profoundly is a different sense and degree of cleanliness."     
        Friedrich Nietzsche`,
    
        `"Cleanliness in the cat world is usually a virtue put above godliness."     
        Carl Van Vechten`,
    
        `"The objective of cleaning is not just to clean, but to feel happiness living within that environment."     
        Marie Kondo`,
    
        `"Don't call the world dirty because you forgot to clean your glasses."
        Aaron Hill`,
    
        `"My second favorite household chore is ironing. My first being hitting my head on the top bunk bed until I faint."  
        Erma Bombeck`,
    
        `"I'm not going to vacuum until Sears makes one you can ride on." 
        Roseanne Barr`,
    
        `"My idea of superwoman is someone who scrubs her own floors."
        Bette Midler`,
    
        `"Few tasks are more like the torture of Sisyphus than housework, with its endless repetition: the clean becomes soiled, the soiled is made clean, over and over, day after day. "
        Simone de Beauvoir`,
    
        `"Dust is a protective coating for fine furniture." 
        Mario Buatta`,
    
        `"Have you ever taken anything out of the clothes basket because it had become, relatively, the cleaner thing?" 
        Katherine Whitehorn`,
    
        `"Housekeeping ain't no joke." 
        Louisa May Alcott`,
    
        `"Housekeeping is like being caught in a revolving door." 
        Marcelene Cox`,
    
        `"If your house is really a mess and a stranger comes to the door, greet him with, 'Who could have done this? We have no enemies.'" 
        Phyllis Diller`,
    
        `"I hate housework. You make the beds, you wash the dishes and six months later you have to start all over again."
        Joan Rivers`,
    
        `"Have a place for everything and keep the thing somewhere else; this is not a piece of advice, it is merely a custom." 
        Mark Twain`,
    
        `"Housework can't kill you, but why take a chance?"
        Phyllis Diller`
    ];

    return quotes[Math.floor(Math.random() * (quotes.length - 1))]

}

export default randomQuote;