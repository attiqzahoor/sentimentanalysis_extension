document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const url = document.getElementById('url').value.trim();
    if (!url.includes("daraz.pk")) {
      alert("Please enter a valid Daraz.pk product URL.");
      return;
    }
  
    // Show result section with loader
    document.getElementById('main').classList.add("hidden");
    document.getElementById('result').classList.remove("hidden");
    document.getElementById('loader').classList.remove("hidden");
    document.getElementById('content').classList.add("hidden");
    document.getElementById('errorState').classList.add("hidden");
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/analyze?url=${encodeURIComponent(url)}&max_pages=2`);
      const data = await response.json();
  
      // Hide loader
      document.getElementById('loader').classList.add("hidden");
  
      if (data.status === "success") {
        document.getElementById('content').classList.remove("hidden");
  
        const { name, image } = data.product;
        const sentiment = data.data.sentiment;
        const issues = data.data.common_issues;
  
        // Calculate total reviews from sentiment
        const total_reviews = sentiment.positive + sentiment.negative + sentiment.neutral;
  
        // Set product info
        document.getElementById('productImage').src = image || 'placeholder.png';
        document.getElementById('productName').textContent = name;
        document.getElementById('reviewCount').textContent = `${total_reviews} Reviews Analyzed`;
  
        // Create chart
        const ctx = document.getElementById('sentimentChart').getContext('2d');
        if (window.myChart) {
          window.myChart.destroy();
        }
  
        window.myChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [{
              data: [sentiment.positive, sentiment.negative, sentiment.neutral],
              backgroundColor: ["#28a745", "#dc3545", "#6c757d"],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  boxWidth: 12,
                  padding: 20
                }
              }
            },
            cutout: '70%'
          }
        });
  
        // Set issues list
        const issuesList = document.getElementById('issuesList');
        issuesList.innerHTML = '';
  
        if (issues.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'No major issues reported';
          li.style.color = '#28a745';
          issuesList.appendChild(li);
        } else {
          issues.forEach(issue => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${issue.issue}</span> <strong>${issue.count}</strong>`;
            issuesList.appendChild(li);
          });
        }
      } else {
        document.getElementById('errorState').classList.remove("hidden");
      }
    } catch (err) {
      console.error(err);
      document.getElementById('loader').classList.add("hidden");
      document.getElementById('errorState').classList.remove("hidden");
    }
  });
  
  document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('main').classList.remove("hidden");
    document.getElementById('result').classList.add("hidden");
    document.getElementById('url').value = '';
  });
  