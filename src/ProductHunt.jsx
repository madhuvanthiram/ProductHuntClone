import React, { Component } from "react";
import "./ProductStyling.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { FaComment } from "react-icons/fa";
import { BsCaretUpFill } from "react-icons/bs";
import Popup from "./Popup";
import Card from "./Card";
import Commentbox from "./Commentbox";


class ProductHunt extends Component {
  state =
  {
    loginOpened: false,
    subprodOpen: false,
    next: false,
    Moreinfo: false,
    commentinfo: false,
    IsPostClicked: false,
    counter: 0,
    CommentList: [],
    emailError: "",
    urlerror:"",
    passwordError: "",
    moreinfoerror: "",
    commentError:"",
     
    email:"",
    password:"",
    selectedFile: "",
    imagePreviewUrl: "",
  
    nameofproduct: "",
    tagline: "",
    topics: "",
   
    url:"",
    textareaval: "",
 
  }
  IncrementItem = this.IncrementItem.bind(this);
  handleOnChange = this.handleOnChange.bind(this);
  togglepopup = this.togglepopup.bind(this);
  fileChangedHandler = this.fileChangedHandler.bind(this);
  

  fileChangedHandler(event) {
    let file = event.target.files[0];
    console.log(file);

    let reader = new FileReader(); //FileReader is an object with the sole purpose of reading data from Blob (and hence File too) objects.
    console.log(reader);

    reader.onloadend = () => {
      //reading finished with either success or failure.
      this.setState({
        selectedFile: file,
        imagePreviewUrl: reader.result, //When the reading is finished, we can access the result as:
        // reader.result is the result (if successful)
        // reader.error is the error (if failed).
      });
    };

    reader.readAsDataURL(file); // when we’d like to use this data in src for img or another tag
  }

  handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
   // this.setState({ values: evt.target.value });

    console.log(evt.target.name); //"email"
    console.log(evt.target.value); //value
    console.log(this.state.file);
  }

  validate = (modalType) => {
    console.log("inside val");
    console.log(modalType)
    let emailError = "";
    let passwordError = "";
    let moreinfoerror = "";
    let urlerror="";
    let commentError="";

    
    if(modalType==="submitaprod")
    {
    const re = new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");//Must contain at least one
    // number and one uppercase and lowercase letter, and at least 8 or more characters
    var pwdvalid = re.test(this.state.password);
    console.log(this.state.password);
    console.log(pwdvalid);
    //email validation
    if (!this.state.email.includes("@") || !this.state.email) {
      console.log("no @");
      emailError = "invalidEmail";
    }
   

    //password validation
    if (!pwdvalid) {
      passwordError =
        "PasswordMust contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
    }
    if (!this.state.password) {
      passwordError = "password invalid";
    }

    if (emailError || passwordError) {
      console.log(emailError);

      this.setState({ emailError, passwordError });

      return false;
    }


  }

  if(modalType==="Moreinfo")
  {

    if (!this.state.nameofproduct || !this.state.tagline || !this.state.topics) {
      moreinfoerror = "the fields cannot be empty";
    }

    if (moreinfoerror ) {
      console.log(moreinfoerror);

      this.setState({ moreinfoerror });

      return false;

  }

  
  }

  if(modalType==="next")
  {
    const patternurl = new RegExp("https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}");
    var urlvalid = patternurl.test(this.state.url);
  

    if (!this.state.url) {
      urlerror = "the url cannot be empty";
    }
    if (!urlvalid)
     {
      urlerror = "Url is not valid";
    }

    if (urlerror) {
      console.log(urlerror);

      this.setState({ urlerror });

      return false;

  }
  
  }


  if(modalType==="Post")
  {
  
    if (!this.state.textareaval) {
      commentError = "the textarea cannot be empty";
    }
    
    if (commentError) {
      console.log(commentError);

      this.setState({ commentError });

      return false;

  }
  
  }
  return true;
  };

  togglepopup(modalType, e) 
  {
    e.preventDefault();
    const isValid = this.validate(modalType);
    console.log(isValid);

    if (modalType === "login") {
      this.setState({
        loginOpened: true,
      });
    } else if (modalType === "submitaprod") {
    console.log("inside submitprod")
    console.log(isValid)

      if(!isValid) 
      {
      console.log(this.state);
      }
      else
      {
        this.setState({
          loginOpened: false,
          subprodOpen: true,
        });
      }
    } else if (modalType === "next") {
      if(!isValid)
      {
      console.log(this.state)

      }
else
{
      this.setState({
        subprodOpen: false,
        next: true,
      });
    }
    } 
    else if (modalType === "Moreinfo") {
      console.log(this.state.selectedFile);
      console.log(this.state.imagePreviewUrl);
      if(!isValid) {
        console.log(this.state);
      }

else
{
      this.setState({
        next: false,
        Moreinfo: true,
      });
    }
    } else if (modalType === "commentinfo") {
      this.setState({
        Moreinfo: false,
        commentinfo: true,
      });
    } else if (modalType === "close") {
      console.log("inside close");
      this.setState({
        loginOpened: false,
        Moreinfo: false,
        commentinfo: false,
        subprodOpen: false,
        next: false,
        commentinfo: false,
      });
    } else if (modalType === "Post") {
if(!isValid)
{
  console.log(this.state)
  // this.setState({
  //   textareaval: "",
  //   commentError: "",
  // });
  console.log(this.state)
}

else
{

      var newCommentArray = this.state.CommentList;

      var itemToBeAdded = {
        name: this.state.email,
        comments: this.state.textareaval,
        likes: 0,
      };

      newCommentArray.push(itemToBeAdded);
      console.log(newCommentArray);
      this.setState({
        IsPostClicked: true,
        newtextval: this.state.textareaval,
        commentError: "",
        textareaval: "",
        CommentList: newCommentArray,
      });
    }
  }
  }

  IncrementItem() {
    this.setState({ counter: this.state.counter + 1 });
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <input type="text" placeholder="Search.." />{" "}
          </li>

          <li>
            <Button variant="link">Discussions</Button>
          </li>
          <li>
            <Button variant="link">Ask</Button>
          </li>
          <li>
            <Button variant="link">Topics</Button>
          </li>

          <li>
            <Button variant="light">Login</Button>
          </li>
          <li>
            <Button type="submit" onClick={(e) => this.togglepopup("login", e)}>
              Sign in
            </Button>
          </li>
        </ul>

        {this.state.commentinfo ? (
          <Popup header={this.state.topics} handleclose={this.togglepopup}>
            <p>
              <img src={this.state.imagePreviewUrl} width="50" height="60" />
              <b>{this.state.nameofproduct}</b>
            </p>
            <p>
              <i>{this.state.tagline}</i>
            </p>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>

              <Form.Control
                required
                as="textarea"
                type="text"
                name="textareaval"
                value={this.state.textareaval}
                onChange={this.handleOnChange}
                rows="3"
                placeholder="Comment here....."
              />
               {this.state.commentError ? (
                  <div style={{ fontsize: 12, color: "red" }}>
                    {this.state.commentError}
                  </div>
                ) : null}
            </Form.Group>
            <Button type="submit" onClick={(e) => this.togglepopup("Post", e)}>
              Post
            </Button>
            {this.state.IsPostClicked ? (
              <Commentbox commentval={this.state.CommentList} />
            ) : null}
          </Popup>
        ) : null}

        {this.state.loginOpened ? (
          <Popup header={<h1>Login Form</h1>} handleclose={this.togglepopup}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Enter email"
                  onChange={this.handleOnChange}
                />

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                {this.state.emailError ? (
                  <div style={{ fontsize: 12, color: "red" }}>
                    {this.state.emailError}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  required
                />
                {this.state.passwordError ? (
                  <div style={{ fontsize: 12, color: "red" }}>
                    {this.state.passwordError}
                  </div>
                ) : null}
              </Form.Group>
              <Button
                type="submit"
                onClick={(e) => this.togglepopup("submitaprod", e)}
              >
                Submit
              </Button>
              <Button variant="primary">close button</Button>
            </Form>
          </Popup>
        ) : null}
        {this.state.subprodOpen ? (
          <Popup
            header={<h1>Submit A Product</h1>}
            handleclose={this.togglepopup}
          >
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter an https:// URL:</Form.Label>
                <Form.Control
                  type="url"
                  name="url"
                  placeholder="https://example.com"
                  required
                  onChange={this.handleOnChange}
                />
               {this.state.urlerror ? (
                  <div style={{ fontsize: 12, color: "red" }}>
                    {this.state.urlerror}
                  </div>
                ) : null}
              </Form.Group>
              <Button
                type="submit"
                size="sm"
                onClick={(e) => this.togglepopup("next", e)}
              >
                Next
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={this.handleCloseModal1}
              >
                close button
              </Button>
            </Form>
          </Popup>
        ) : null}
        {this.state.next ? (
          <Popup
            header={<h1>Tell us more about this product</h1>}
            handleclose={this.togglepopup}
          >
            <Form>
              <Form.Row>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Name of Product</Form.Label>
                  <Form.Control
                    name="nameofproduct"
                    onChange={this.handleOnChange}
                    placeholder="simply the name of the product"
                  />
                 
                </Form.Group>
                <br />
                <Form.Group controlId="formGridPassword">
                  <Form.Label>Tagline</Form.Label>
                  <Form.Control
                    name="tagline"
                    onChange={this.handleOnChange}
                    placeholder="Concise and descriptive tagline for the product"
                  />
                  {this.state.moreinfoerror ? (
                  <div style={{ fontsize: 12, color: "red" }}>
                    {this.state.moreinfoerror}
                  </div>
                ) : null} 
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group controlId="formGridState">
                  <Form.Label>Topics</Form.Label>
                  <Form.Control
                    as="select"
                    name="topics"
                    onChange={this.handleOnChange}
                    defaultValue="Choose..."
                  >
                    <option value="cooking">Cooking</option>
                    <option value="tech">Tech</option>
                    <option value="fashion">Fashion</option>
                  </Form.Control>
                </Form.Group>
              
              </Form.Row>
              <br />
              <label>
                Upload file:
                <input
                  type="file"
                  onChange={this.fileChangedHandler}
                  name="file"
                />
              </label>

              <Button
                variant="primary"
                type="submit"
                onClick={(e) => this.togglepopup("Moreinfo", e)}
              >
                Submit
              </Button>
            </Form>
          </Popup>
        ) : null}
        {this.state.Moreinfo ? (
          <Card
            img={this.state.imagePreviewUrl}
            header={this.state.topics}
            name={this.state.nameofproduct}
            handleclose={this.togglepopup}
          >
            <p>{this.state.tagline}</p>
            <button onClick={(e) => this.togglepopup("commentinfo", e)}>
              <FaComment />
            </button>
            <button onClick={this.IncrementItem}>
              <BsCaretUpFill />
              {this.state.counter}
            </button>
          </Card>
        ) : null}
      </div>
    );
  }
}

export default ProductHunt;
