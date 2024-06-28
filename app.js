document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('chartCanvas');
    const ctx = canvas.getContext('2d');

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const items = data.items;
            const barWidth = 50;
            const barSpacing = 10;
            let total = 0;

            items.forEach((item, index) => {
                ctx.fillStyle = 'blue';
                ctx.fillRect(index * (barWidth + barSpacing), canvas.height - item.count, barWidth, item.count);
                ctx.fillStyle = 'black';
                ctx.fillText(item.name, index * (barWidth + barSpacing), canvas.height - item.count - 10);
                total += item.count;
            });

            ctx.fillText('Total: ' + total, 10, 20);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            ctx.fillText('Error loading data', 10, 20);
        });
});
