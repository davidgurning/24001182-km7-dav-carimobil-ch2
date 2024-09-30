import carsData from "../data/cars.json" with {type: "json"};

console.log (carsData);

const carsContainer = document.getElementById("cars-content");

    
carsContainer.innerHTML = "<h2>Loading...</h2>";


let carContentHtml = "";
    
setTimeout(() => {
  carsData.map((card) => {
    const carsContainer = `
    <div class="col-md-3">
          <div class="card" style="width: 18rem">
            <img src="${card.image}" class="card-img-top img-fluid" style="height:200px;width:auto; object-fit: cover;" alt="..." />
            <div class="card-body">
              <p class="card-carPrice">${card.type} / ${card.model}</p>
              <h5 class="card-title" style="font-weight:bold;">Rp ${card.rentPerDay} /hari</h5>
              <p class="card-text" style= "line-height: 30px;">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ut quaerat beatae officiis ratione autem molestias eos eum enim.
              </p>
              <div class="d-flex" style="margin-top:8px;"><img src="../public/images/fi_users.png" alt= "" <p class="card-penumpang">&nbsp;&nbsp;${card.capacity} orang</p></div>
              <div class="d-flex" style="margin-top:8px;"><img src="../public/images/fi_settings.png" alt= ""<p class="card-system">&nbsp;&nbsp;${card.transmission}</p></div>
              <div class="d-flex" style="margin-top:8px;"><img src="../public/images/fi_calendar.png" alt= ""<p class="card-tahun">&nbsp;&nbsp;${card.year}</p></div>
              
              <a href="#" class="btn btn-primary" style="background-color:#5CB85F;width:100%;margin-top:20px;border:0px;" >Pilih Model</a>
            </div>
          </div>
        </div>
    `;

    carContentHtml += carsContainer;
});
carsContainer.innerHTML = carContentHtml;
}, 3000);


const dateinputSearch = document.getElementById("searchdateInput");
// console.log(carContentHtml);


dateinputSearch.addEventListener("input",(e) =>{
  const filterDate = new Date(dateinputSearch.value).getTime();
  const temp = [];

  carsData.forEach( e => {
    
    if(filterDate <= new Date (e.availableAt).getTime()){
      temp.push(e)
      console.log(e.availableAt); 
    }
  });

  console.log(temp.length);
  if(temp.length > 0){
    carsContainer.innerHTML = "";
    carContentHtml = "";
      temp.map((card) => {
      const carsContainer = `
      <div class="col-md-3">
          <div class="card" style="width: 18rem">
            <img src="${card.image}" class="card-img-top img-fluid" style="height:200px;width:auto; object-fit: cover;" alt="..." />
            <div class="card-body">
              <p class="card-carPrice">${card.type} / ${card.model}</p>
              <h5 class="card-title" style="font-weight:bold;">Rp ${card.rentPerDay} /hari</h5>
              <p class="card-text" style= "line-height: 30px;">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ut quaerat beatae officiis ratione autem molestias eos eum enim.
              </p>
              <div class="d-flex" style="margin-top:8px;"><img src="../public/images/fi_users.png" alt= "" <p class="card-penumpang">&nbsp;&nbsp;${card.capacity} orang</p></div>
              <div class="d-flex" style="margin-top:8px;"><img src="../public/images/fi_settings.png" alt= ""<p class="card-system">&nbsp;&nbsp;${card.transmission}</p></div>
              <div class="d-flex" style="margin-top:8px;"><img src="../public/images/fi_calendar.png" alt= ""<p class="card-tahun">&nbsp;&nbsp;${card.year}</p></div>
              
              <a href="#" class="btn btn-primary" style="background-color:#5CB85F;width:100%;margin-top:20px;border:0px;" >Pilih Model</a>
            </div>
          </div>
        </div>
    `;
    carContentHtml += carsContainer;
  });
carsContainer.innerHTML = carContentHtml;
  }
  else{
      carsContainer.innerHTML = "";
      carsContainer.innerHTML = "<h2>Data Tidak Ditemukan</h2>";
  }
  

  console.log(filterDate)
}); 



// -----------banyak penumpang

const banyakPenumpang = document.getElementById("passengerCount");

banyakPenumpang.addEventListener("input", function() {
  const passengerValue = parseInt(banyakPenumpang.value);
  console.log("Jumlah penumpang:", passengerValue);
  filterCarsByCapacity(passengerValue);
});

function filterCarsByCapacity(passengerCount) {
  const filteredCars = carsData.filter(car => car.capacity >= passengerCount);
  displayFilteredCars(filteredCars);
}

function displayFilteredCars(filteredCars) {
  let carContentHtml = "";

  // Cek jika tidak ada mobil yang memenuhi kriteria
  if (filteredCars.length === 0) {
    carContentHtml = "<h2>Mobil tidak tersedia</h2>";
  } else {
    filteredCars.forEach((car) => {
      const carsContainer = `
        <div class="col-md-3">
          <div class="card" style="width: 18rem">
            <img src="${car.image}" class="card-img-top img-fluid" style="height:200px;width:auto; object-fit: cover;" alt="${car.model}" />
            <div class="card-body">
              <p class="card-carPrice">${car.type} / ${car.model}</p>
              <h5 class="card-title" style="font-weight:bold;">Rp ${car.rentPerDay} /hari</h5>
              <p class="card-text" style= "line-height: 30px;">
                ${car.description}
              </p>
              <div class="d-flex" style="margin-top:8px;">
                <img src="../public/images/fi_users.png" alt="Penumpang" />
                <p class="card-penumpang">&nbsp;&nbsp;${car.capacity} orang</p>
              </div>
              <div class="d-flex" style="margin-top:8px;">
                <img src="../public/images/fi_settings.png" alt="Transmisi" />
                <p class="card-system">&nbsp;&nbsp;${car.transmission}</p>
              </div>
              <div class="d-flex" style="margin-top:8px;">
                <img src="../public/images/fi_calendar.png" alt="Tahun" />
                <p class="card-tahun">&nbsp;&nbsp;${car.year}</p>
              </div>
              <a href="#" class="btn btn-primary" style="background-color:#5CB85F;width:100%;margin-top:20px;border:0px;">Pilih Model</a>
            </div>
          </div>
        </div>
      `;
      carContentHtml += carsContainer;
    });
  }

  // Perbarui tampilan kontainer mobil
  carsContainer.innerHTML = carContentHtml;
}




