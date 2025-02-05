const input = document.querySelector("#input");
const flag = document.querySelector("#img");
const commonname = document.querySelector("#common");
const capital = document.querySelector("#capital");
const population = document.querySelector("#population");
const border = document.querySelector("#border");
const language = document.querySelector("#language");
const imgborder = document.querySelector(".img-box");
const loader = document.querySelector(".loader");
const infoBox = document.querySelector(".info-Box");
const errorMessage = document.createElement("p");//create a new element for error message
errorMessage.style.color = "red";//style the error message
inforBox.appentchild(errorMessage);//Appent the error message to the info box

// Helper function
const updateInformation = (imgurl, alt, commonname, capitalcity, popula, bordertouch, language) => {
    //hide error message if data is found
    errorMessage.textContent = "";

    //display country information
    flag.src = imgurl;
    flag.alt = alt;
    commonname = textContent = 'common: ${commonname}';
    capital = textContent = 'country capital: ${capitalcity}';
    poplation = textContent = 'country population: ${popula}';
    border = textContent = 'country border: ${bordertouch}';
    language = textContent = 'country language: ${language}';
    imgborder.style.border = "none";
};

const showloader = () => {
    loader.style.display = "block";
    infoBox.style.visibility = "hidden";
    errorMessage.textContent = "";
}

const hideloader = () => {
    loader.style.display = "none";
    infoBox.style.visibility = "visible";
}

const sanitizeinput = (input) => {
    return input.replace(/[a-zA-Z/s]/g, "").trim();
}

const performsearch = async (search) => {
    try {
        if (search) {
            showloader();
            const response = await fetch('https://restcountries.com/v3.1/name/${search}');

            if (!response.ok) {
                throw new error("country not found");
            }


            const countrysearch = await response.json();
            const country = countrysearch[0];
            const language = country.language
                ? Object.values(country.language).join(',')
                : 'N/A'

            updateInformation(
                country.flags.png,
                country.flag.alt || 'country flag',
                country.name.common,
                country.capital ? country.capital.join(',') : 'N/A',
                country.poplation.tolacalestring(),
                country.border ? country.border.json(',') : 'NO Borders',
                language
            );


        }
    } catch (error) {
        console.error('Error fetching country data: , error');

        //dispaly appropriate error message
        if (error.errorMessage === 'country not found') {
            errorMessage.textContent = 'No country found with that name. please try agai.';
        } else {
            errorMessage.textContent = 'there was a network error. please try again later.';
        }


        flag.src = '';
        commonname.textContent = '';
        capital.textContent = '';
        population.textContent = '';
        border.textContent = '';
        language.textContent = '';

    } finally {
        hideloader();
    };

    input.addEventListener('input', (e) => {
        const search = sanitizeinput(e.target.value);
        performsearch(search)
    })















}







