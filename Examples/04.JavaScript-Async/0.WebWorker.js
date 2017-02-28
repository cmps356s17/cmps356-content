function avg() {
    let sum=0; count = 0;
    for(let i=1; i<=100000000; i++) {
        sum += i;
        count++;
    }
    let avg = sum/count;

    //Return results to the main thread
    postMessage(avg);
}

avg();