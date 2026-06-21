import DanhSach from "./component/DanhSach";
import FormInfo from "./component/FormInfo";
import Info from "./component/FormInfo";
import SearchBar from "./component/SearchBar";

function App() {
  return (
    <>
      <div
        className="min-h-screen "
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto ">
          <p className="text-center text-4xl mb-10 font-bold font-serif">
            React Form
          </p>
          <FormInfo />
          <SearchBar />
          <DanhSach />
        </div>
      </div>
    </>
  );
}

export default App;
