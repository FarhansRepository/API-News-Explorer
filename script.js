document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchButton');
  const apiKeyInput = document.getElementById('apiKey');
  const endpointInput = document.getElementById('apiEndpoint');
  const searchTermInput = document.getElementById('searchTerm');
  const filterTypeInput = document.getElementById('searchType');
  const resultsContainer = document.getElementById('results');

  searchButton.addEventListener('click', function () {
    const apiKey = apiKeyInput.value;
    const endpoint = endpointInput.value;
    const searchTerm = searchTermInput.value;
    const filterType = filterTypeInput.value;

    if (apiKey.trim() !== '' && endpoint.trim() !== '' && searchTerm.trim() !== '') {
      searchAPI(apiKey, endpoint, searchTerm, filterType);
    } else {
      alert('Please fill in all required fields.');
    }
  });

  function searchAPI(apiKey, endpoint, term, secondFilt) {
    const filterQuery = `fq=headline:("${term}") AND pub_year:("${secondFilt}")`;
    const apiUrl = `${endpoint}?${filterQuery}&api-key=${apiKey}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        displayResults(data.results); // Replace 'results' with the actual key containing articles in your API response
      })
      .catch(error => {
        console.error('Error making API request:', error.message);
      });
  }

  function displayResults(articles) {
    resultsContainer.innerHTML = '';

    if (articles.length === 0) {
      resultsContainer.innerHTML = 'No articles found.';
      return;
    }

    articles.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article');

      const headline = document.createElement('h3');
      headline.textContent = article.headline;

      const snippet = document.createElement('p');
      snippet.textContent = article.snippet;

      articleDiv.appendChild(headline);
      articleDiv.appendChild(snippet);

      resultsContainer.appendChild(articleDiv);
    });
  }
});
