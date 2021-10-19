<script lang='ts'>
import './styles.css'
</script>

<main>
  <slot />
</main>

<footer>
  <ul>
    <li>
      <a href="https://github.com/WaltzingPenguin/pokemon-suspense-demo">GitHub Repository</a>
    </li>
    <li>
      Powered by <a href="https://pokeapi.co/">https://pokeapi.co/</a>
    </li>
  </ul>
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
  margin-top: 1em;
  text-align: center;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
@media (min-width: 35em) {
  ul {
    display: flex;
    justify-content: center;
  }
  li:not(:first-child)::before {
    content: "•";
    margin: 0 .3em;
  }
}
</style>
