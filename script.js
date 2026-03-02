const getCountryInfo = async () => {
    let spinner = null;
    try {
        // Show loading spinner
        spinner = document.getElementById('loading-spinner');
        spinner.style.display = 'block';
    } catch(error) {

    } finally {
        spinner.style.display = 'none';
    }
}