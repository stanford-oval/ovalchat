export default function shuffleArray(array){
    let currentIndex = array.length
    let randomIndex;
    
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
    
        // pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    console.log('randomized the order of systems');
      
    return array
}