/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
 let kittens = []
 let mood = ""
 let affection = 5
 
 function addKitten(event) {
 event.preventDefault()
 
 let form = event.target
 
 let kitten = {
   id: generateId(),
   name: form.name.value,
   mood: "tolerant",
   affection: 5,
 }
 if (form.name.value == "") {alert("You must enter a name")}
 
 else {
 
 kittens.push(kitten)
 saveKittens()
 
 form.reset()
 drawKittens()
 }}

 function saveKittens() {
   window.localStorage.setItem("kittens", JSON.stringify(kittens))
   drawKittens()
 }
 

 function loadKittens() {
   let catData = JSON.parse(window.localStorage.getItem("kittens"))
   if (catData) {
     kittens = catData
   }
 }
 

 function drawKittens() {
   loadKittens()
   let kittenElem = document.getElementById("moody-kittens")
   let kittensTemplate = ""
 
   kittens.forEach(kitten => {
     kittensTemplate +=`
     <div class="cat-border bg-dark kitten ${kitten.mood} text-light">
       <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=150x150">
       <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
       <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
       <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
       <div class="d-flex space-between"></div>
       <button class="btn-cancel m-1" onclick="pet('${kitten.id}')">Pet kitty</button>
       <button class="m-1" onclick="catnip('${kitten.id}')">Catnip</button>
       <div class="d-flex justify-content-center"><i class="action fa fa-trash text-danger" onclick="removeKitten('${kitten.id}')"></i></div>
       </div>
     </div>
  `
 })
 
 kittenElem.innerHTML = kittensTemplate
 }
 
 function findKittenById(id) {
   return kittens.find(k => k.id == id);
 }
 

 function pet(id) {
     let currentKitten = findKittenById(id)
     let randNum = Math.random()
     if (randNum > .7) {
       currentKitten.affection ++;
       setKittenMood(currentKitten)
       saveKittens()
 
     }
     else currentKitten.affection --;
     setKittenMood(currentKitten)
     saveKittens()
   }

 function catnip(id) {
   let currentKitten = findKittenById(id)
   currentKitten.mood = "tolerant"
   currentKitten.affection = 5;
   saveKittens()
 }
 
 function setKittenMood(kitten) {
   document.getElementById("moody-kittens").classList.remove(kitten.mood)
   if (kitten.affection >= 6) {kitten.mood = "happy"}
   if (kitten.affection <= 5) {kitten.mood = "tolerant"}
   if (kitten.affection <= 3) {kitten.mood = "angry"}
   if (kitten.affection <= 0) {kitten.mood = "gone"}
 
   document.getElementById("moody-kittens").classList.add(kitten.mood)
   saveKittens()
 }
 
 function getStarted() {
   document.getElementById("welcome").remove();
   document.getElementById("add-div").classList.remove("hidden")
   drawKittens()
 }

 function generateId() {
   return (
     Math.floor(Math.random() * 10000000) +
     "-" +
     Math.floor(Math.random() * 10000000)
   );
 }
 
 function removeKitten(id) {
   console.log(id)
   let index = kittens.findIndex(kitten => kitten.id == id)
   if (index == -1) {
     throw new Error("Invalid ID")
   }
   kittens.splice(index, 1)
   saveKittens()
 }