async function start() {

    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
		if(response.status != 200)
		{
			document.getElementById("boxerror").style.display = "block"
			document.getElementById("boxerror").innerHTML = "OOPS :( THERE IS A PROBLEM WITH THE CONNECTION"
		}
		else{
			const data = await response.json()
			createBreedList(data.message)
		}
    }catch (e) {
		 document.getElementById("boxerror").innerHTML = "OOPS :( THERE IS A PROBLEM WITH THE CONNECTION"
    }
}

start()

//BREED LIST AND OBJECT KEYS FOR THE KEYS(BREEDS) OF DOGS

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML=`
    <select id="theName" onchange="loadByBreed(this.value)">
            <option value="-1">Choose a dog breed</option>
            ${Object.keys(breedList).map(function(breed) {
                return `<option>${breed}</option>`
            }).join('')}

        </select>
    `
}


async function loadByBreed(breed) {
    try{
        document.getElementById("boxerror").style.display = "none"
        if(breed !== "-1"){
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
            const data = await response.json()
            createDogsImages(data.message)
        }
        
    }catch (e){
        console.log("OOPS :( THERE IS NOT IMAGE")
    }
}

function createDogsImages(images) {
    
    let dogName = theName.options[theName.selectedIndex].value

    document.getElementById("dogsimages").innerHTML = `
    <div>
        <h3 class="h3text">${dogName}</h3>
        <div class="imagenes">
            <div class="box"><img src='${images[0]}' width="200"/></div>
            <div class="box"><img src='${images[1]}' width="200"/></div>
            <div class="box"><img src='${images[2]}' width="200"/></div>
        </div>
        <div class="modal">
            <span class="close"><i>Close</i></span>
            <div class="modalContent">
            <img src="" class="modalImg"/>
            </div>
        </div>
    </div>
    `
    const imagenes = document.querySelectorAll(".imagenes img")
    const modal = document.querySelector(".modal")
    const modalImg = document.querySelector(".modalImg")
    const close = document.querySelector(".close")

    function modalImage() {
        imagenes.forEach((image) => {
            image.addEventListener("click", () => {
                modalImg.src = image.src;
                modal.classList.add("appear")

                close.addEventListener("click", () => {
                    modal.classList.remove("appear")
                })
            })
        })
    }
    modalImage()
}