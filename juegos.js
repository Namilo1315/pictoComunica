document.addEventListener("DOMContentLoaded", function () {
    const addPictogramBtn = document.getElementById("addPictogramBtn");
    const pictogramInput = document.getElementById("pictogramInput");
    const pictogramContainer = document.getElementById("pictogramContainer");
  
    // Cargar pictogramas desde localStorage
    const loadPictograms = () => {
      const storedPictograms = JSON.parse(localStorage.getItem("customPictograms")) || [];
      storedPictograms.forEach((pictogram) => addPictogramToDOM(pictogram));
    };
  
    // Guardar pictograma en localStorage
    const savePictogramToLocalStorage = (pictogram) => {
      const storedPictograms = JSON.parse(localStorage.getItem("customPictograms")) || [];
      storedPictograms.push(pictogram);
      localStorage.setItem("customPictograms", JSON.stringify(storedPictograms));
    };
  
    // Eliminar pictograma de localStorage
    const removePictogramFromLocalStorage = (word) => {
      let storedPictograms = JSON.parse(localStorage.getItem("customPictograms")) || [];
      storedPictograms = storedPictograms.filter((pictogram) => pictogram.word !== word);
      localStorage.setItem("customPictograms", JSON.stringify(storedPictograms));
    };
  
    // Agregar pictograma al DOM
    const addPictogramToDOM = ({ src, word }) => {
      const col = document.createElement("div");
      col.className = "col col-lg-2 text-center position-relative";
  
      const img = document.createElement("img");
      img.src = src;
      img.alt = word;
      img.className = "pictograma n1 bg-orange-pastel";
      img.dataset.word = word;
      img.id = word ? word.replace(/\s+/g, "").toLowerCase() : ""; // Validación para evitar errores
      img.width = 80;
  
      const p = document.createElement("p");
      p.className = "fw-bold text-center parrafos";
      p.textContent = word;
  
      // Crear botón de eliminar
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger btn-sm position-absolute top-0 end-0";
      deleteBtn.textContent = "X";
      deleteBtn.style.transform = "translate(50%, -50%)";
      deleteBtn.style.borderRadius = "50%";
  
      // Evento para eliminar pictograma
      deleteBtn.addEventListener("click", () => {
        col.remove(); // Eliminar del DOM
        removePictogramFromLocalStorage(word); // Eliminar del localStorage
      });
  
      col.appendChild(img);
      col.appendChild(p);
      col.appendChild(deleteBtn);
      pictogramContainer.appendChild(col);
    };
  
    // Evento para abrir el selector de archivos
    addPictogramBtn.addEventListener("click", () => {
      pictogramInput.click();
    });
  
    // Evento para procesar la imagen seleccionada
    pictogramInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const src = e.target.result;
          const word = prompt("Ingrese la palabra para el pictograma:");
          if (word && word.trim()) { // Validar que el usuario haya ingresado un texto
            const pictogram = { src, word };
            addPictogramToDOM(pictogram);
            savePictogramToLocalStorage(pictogram);
          } else {
            alert("Por favor, ingrese un texto válido.");
          }
        };
        reader.readAsDataURL(file);
      }
    });
  
    loadPictograms(); // Cargar pictogramas al inicio
  });
  