<script>
import './styles.css'
</script>

<main>
  <slot />
</main>

<footer>
  Powered by <a href="https://pokeapi.co/">https://pokeapi.co/</a>
  &bull;
  <a href="https://github.com/WaltzingPenguin/pokemon-suspense-demo">GitHub Repository</a>
</footer>

<style>
main {
  flex-grow: 1;
}
a {
  color: inherit;
}
footer {
  color: #888;
  font-size: 85%;
  text-align: center;
}
p {
  margin: 0;
}
</style>