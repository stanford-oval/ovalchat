export default function shuffleArray(array){
    // Returns a shuffled copy of the array
    let copy = [...array]
    let currentIndex = copy.length
    let randomIndex;
    
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
    
        // pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // swap it with the current element.
        [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
    }
    console.log('randomized the order of systems');
      
    return copy
}