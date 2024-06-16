import React from "react";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64Data: null
    };
  }

  onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsDataURL(file); // Usar readAsDataURL para carregar a imagem
    }
  };

  handleReaderLoaded = (e) => {
    const base64Data = e.target.result;
    this.setState({ base64Data });
    this.props.onImageUpload(base64Data); // Chama a função passada como prop
  };

  render() {
    return (
      <div>
        <input
          type="file"
          name="image"
          id="file"
          accept=".jpg, .jpeg, .png"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default ImageUpload;
