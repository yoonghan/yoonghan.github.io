import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import Menu from "@/components/Menu"
import SnakeGame from "@/pageComponents/Projects/Snake/SnakeGame"

const GameSnake = () => {
  return (
    <>
      <HtmlHead title={"Snake Game"} description={"A Nokia snake game"} />
      <Menu />
      <div className="page-aligned-container">
        <h1>Snake Game</h1>
        <SnakeGame />
      </div>
      <Footer />
    </>
  )
}

export default GameSnake
