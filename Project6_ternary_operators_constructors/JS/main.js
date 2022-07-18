




// Tenary Function
function voteFunction() {
    var Age, canVote;
    Age = document.getElementById("Age").value;
    canVote = (Age < 18) ? " you are to young to vote ":" You are eligiable ";
    document.getElementById("vote").innerHTML = canVote + " to vote ";
}


// Nested function
function count_Function() {
    document.getElementById("Nested_Function").innerHTML = Count(); //displays results
    function Count() {
    var Starting_point = 9;
    function Plus_one() {Starting_point += 1;}
    Plus_one();
    return Starting_point;
    }
}
