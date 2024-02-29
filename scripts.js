document.addEventListener('DOMContentLoaded', function() {
  // Fetch data from the JSON file
  fetch('travel_recommendations_api.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Handle search button click
          const searchButton = document.querySelector('input[type="submit"]');
          searchButton.addEventListener('click', function(event) {
              event.preventDefault(); // Prevent default form submission behavior

              const searchOptions = document.getElementById('search-options');
              const selectedOption = searchOptions.value.toLowerCase(); // Convert selected option to lowercase

              // Clear previous recommendations
              const recommendationsContainer = document.getElementById('recommendations');
              recommendationsContainer.innerHTML = '';

              // Filter and display recommendations based on selected option
              filterAndDisplayRecommendations(data, selectedOption, recommendationsContainer);
          });

          // Handle reset button click
          const resetButton = document.querySelector('input[type="reset"]');
          resetButton.addEventListener('click', function(event) {
              event.preventDefault(); // Prevent default form submission behavior

              // Clear the recommendations container
              const recommendationsContainer = document.getElementById('recommendations');
              recommendationsContainer.innerHTML = '';
          });
      })
      .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('There was a problem with the fetch operation:', error);
      });

  // Function to filter and display recommendations based on keyword
  function filterAndDisplayRecommendations(data, keyword, container) {
      data.forEach(country => {
          country.cities.forEach(city => {
              if ((city.category && city.category.toLowerCase() === keyword) || city.name.toLowerCase().includes(keyword)) {
                  // Display city info
                  const cityElement = document.createElement('div');
                  cityElement.classList.add('city');

                  const cityNameElement = document.createElement('h4');
                  cityNameElement.textContent = city.name;
                  cityElement.appendChild(cityNameElement);

                  const descriptionElement = document.createElement('p');
                  descriptionElement.textContent = city.description;
                  cityElement.appendChild(descriptionElement);

                  city.imageUrls.forEach(imageUrl => {
                      // Display city image
                      const imageElement = document.createElement('img');
                      imageElement.src = imageUrl;
                      imageElement.alt = city.name;
                      cityElement.appendChild(imageElement);
                  });

                  // Append city info to container
                  container.appendChild(cityElement);
              }
          });
      });
  }
});
