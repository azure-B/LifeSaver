import GlobalStyle from "./GlobalStyle";
import ScrollBackground from "./Components/ScrollBackground";
import Footer from "./components/Layout/Footer";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  return (
    <div>
      {/* <Menu /> */}
      <Footer />
      <GlobalStyle></GlobalStyle>
      <ScrollBackground></ScrollBackground>
    </div>
  );
}

export default App;
