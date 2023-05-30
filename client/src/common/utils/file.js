export const uploadString = () => new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain";
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsText(file);
    };
    input.click();
});