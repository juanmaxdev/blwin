const preguntasReact = [
  {
    id: 1,
    pregunta: '¿Qué resultado mostrará este hook personalizado?',
    codigo: `
import { useState, useEffect } from 'react';

function useDelayedCount(initial, delay) {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
  return count;
}

function App() {
  const count = useDelayedCount(0, 1000);
  return <div>{count}</div>;
}
    `,
    opcionesRespuesta: {
      a: 'Un contador que aumenta cada milisegundo',
      b: 'Un contador que aumenta cada segundo',
      c: 'Siempre muestra 0',
      d: 'Error en tiempo de ejecución',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 2,
    pregunta: '¿Qué pasará si este componente recibe props cambiantes de ‘config’?',
    codigo: `
function Widget({ config }) {
  const [state, setState] = useState(config.value);
  useEffect(() => {
    setState(config.value);
  }, [config]);
  return <span>{state}</span>;
}
    `,
    opcionesRespuesta: {
      a: 'Siempre sincroniza state con config.value',
      b: 'Nunca se re-renderiza',
      c: 'Puede provocar render loops si config es un objeto nuevo cada vez',
      d: 'Ignora los cambios en config.value',
    },
    respuestaCorrecta: 'c',
  },
  {
    id: 3,
    pregunta: '¿Qué devuelve React.memo en este contexto?',
    codigo: `
const Button = React.memo(function Button({ onClick, label }) {
  console.log('render', label);
  return <button onClick={onClick}>{label}</button>;
});

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button label="A" onClick={() => {}} />
      <Button label="B" onClick={() => setCount(c => c + 1)} />
    </>
  );
}
    `,
    opcionesRespuesta: {
      a: 'Nunca vuelve a renderizar ningún botón',
      b: 'Solo re-renderiza el botón B al cambiar count',
      c: 'Re-renderiza ambos botones cada click',
      d: 'Produce un error porque onClick cambia',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 4,
    pregunta: '¿Cuál es la salida al usar useRef así?',
    codigo: `
function App() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return <div>{renderCount.current}</div>;
}
    `,
    opcionesRespuesta: {
      a: 'Siempre 1',
      b: 'El número de renders del componente',
      c: 'Incrementa pero no re-renderiza',
      d: 'Undefined.current',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 5,
    pregunta: '¿Qué hace este fragmento con useCallback?',
    codigo: `
function App() {
  const [val, setVal] = useState(0);
  const handler = useCallback(() => {
    console.log(val);
  }, []);
  useEffect(() => { handler(); }, [handler]);
  return <button onClick={() => setVal(v => v + 1)}>+</button>;
}
    `,
    opcionesRespuesta: {
      a: 'Imprime siempre el valor actualizado de val',
      b: 'Imprime siempre 0 y nunca cambia',
      c: 'Causa dependencia cíclica en useEffect',
      d: 'Error porque handler depende de val',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 6,
    pregunta: '¿Qué efecto tiene pasar una función inline en props?',
    codigo: `
function Parent() {
  const [n, setN] = useState(0);
  return <Child onAction={() => console.log(n)} />;
}

const Child = React.memo(({ onAction }) => {
  console.log('child render');
  return <button onClick={onAction}>Go</button>;
});
    `,
    opcionesRespuesta: {
      a: 'Child renderiza solo una vez',
      b: 'Child renderiza en cada Parent render',
      c: 'Child no renderiza nunca',
      d: 'Error por función inline',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 7,
    pregunta: '¿Cuál es el problema de este useEffect?',
    codigo: `
function App({ fetchData }) {
  const [data, setData] = useState(null);
  useEffect(async () => {
    const d = await fetchData();
    setData(d);
  }, [fetchData]);
  return <pre>{JSON.stringify(data)}</pre>;
}
    `,
    opcionesRespuesta: {
      a: 'Los useEffect no aceptan funciones async',
      b: 'fetchData no es dependencia',
      c: 'setData no está en el array',
      d: 'No hay problemas',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 8,
    pregunta: '¿Cuál será la salida de este contexto?',
    codigo: `
const Ctx = React.createContext(0);
function A() {
  return (
    <Ctx.Provider value={1}>
      <B />
    </Ctx.Provider>
  );
}
function B() {
  return <Ctx.Provider value={2}><C /></Ctx.Provider>;
}
function C() {
  return <Ctx.Consumer>{value => <span>{value}</span>}</Ctx.Consumer>;
}
    `,
    opcionesRespuesta: {
      a: '0',
      b: '1',
      c: '2',
      d: 'Error de contexto anidado',
    },
    respuestaCorrecta: '2',
  },
  {
    id: 9,
    pregunta: '¿Qué sucede con este portal?',
    codigo: `
function App() {
  return ReactDOM.createPortal(
    <div>Modal</div>,
    document.getElementById('modal-root')
  );
}
    `,
    opcionesRespuesta: {
      a: 'Renderiza dentro del div#modal-root fuera del árbol principal',
      b: 'Ignora el portal y usa el div padre',
      c: 'Error si no hay modal-root',
      d: 'Duplicado en ambos lugares',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 10,
    pregunta: '¿Qué hace React.lazy en este ejemplo?',
    codigo: `
const Other = React.lazy(() => import('./Other'));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Other />
    </Suspense>
  );
}
    `,
    opcionesRespuesta: {
      a: 'Carga Other sincronamente',
      b: 'Carga Other solo en primera renderización',
      c: 'Divide código y carga Other bajo demanda',
      d: 'Provoca error sin <Suspense>',
    },
    respuestaCorrecta: 'c',
  },
  {
    id: 11,
    pregunta: '¿Cuál es el resultado de memo + forwardRef?',
    codigo: `
const Input = React.memo(React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
)));
function App() {
  const ref = useRef();
  useEffect(() => { ref.current.focus(); }, []);
  return <Input />;
}
    `,
    opcionesRespuesta: {
      a: 'Input enfocado sin recrear componente',
      b: 'Error porque memo no funciona con refs',
      c: 'Ref queda undefined',
      d: 'Se recrea en cada render',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 12,
    pregunta: '¿Qué renderiza este fragmento Typescript?',
    codigo: `
type Props = { count: number };
function App({ count }: Props) {
  return <div>{count * 2}</div>;
}
<App count={5} />;
    `,
    opcionesRespuesta: {
      a: '10',
      b: '5',
      c: 'NaN',
      d: 'Error de tipos',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 13,
    pregunta: '¿Qué hace este custom hook con useReducer?',
    codigo: `
function useCounter() {
  const [state, dispatch] = useReducer((s, a) => s + a, 0);
  return [state, () => dispatch(1)];
}
function App() {
  const [c, inc] = useCounter();
  return <button onClick={inc}>{c}</button>;
}
    `,
    opcionesRespuesta: {
      a: 'Contador que incrementa en 1 por click',
      b: 'Contador decrementa en 1',
      c: 'Siempre muestra 0',
      d: 'Error porque dispatch necesita objeto',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 14,
    pregunta: '¿Qué implica pasar {children} así?',
    codigo: `
function Wrapper({ children }) {
  return <div className="w">{children}</div>;
}
function App() {
  return (
    <Wrapper>
      <p>Hola</p>
    </Wrapper>
  );
}
    `,
    opcionesRespuesta: {
      a: 'Renderiza <p>Hola</p> dentro del div',
      b: 'Ignora children si no es explícito',
      c: 'Error de props',
      d: 'children será undefined',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 15,
    pregunta: '¿Cómo evita este patrón prop drilling?',
    codigo: `
const ThemeCtx = React.createContext();
function App() {
  return (
    <ThemeCtx.Provider value="dark">
      <Deep />
    </ThemeCtx.Provider>
  );
}
function Deep() {
  return <Inner />;
}
function Inner() {
  const theme = useContext(ThemeCtx);
  return <span>{theme}</span>;
}
    `,
    opcionesRespuesta: {
      a: 'Pasa theme solo por props desde App hasta Inner',
      b: 'Usa Context para acceder a theme sin pasar props manuales',
      c: 'No evita prop drilling',
      d: 'createContext força prop drilling',
    },
    respuestaCorrecta: 'b',
  },
];

const preguntasNet = [
  {
    id: 1,
    pregunta: '¿Qué imprimirá este fragmento de C#?',
    codigo: `
int x = 5;
object o = x;
x = 10;
Console.WriteLine(o);
    `,
    opcionesRespuesta: {
      a: '5',
      b: '10',
      c: 'null',
      d: 'Error en tiempo de compilación',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 2,
    pregunta: '¿Cuál será el resultado de esta consulta LINQ?',
    codigo: `
var nums = new[]{1,2,3,4,5};
var q = nums.Where(n => n % 2 == 0).Select(n => n * 10);
Console.WriteLine(string.Join(',', q));
    `,
    opcionesRespuesta: {
      a: '2,4',
      b: '20,40',
      c: '1,3,5',
      d: '10,20,30,40,50',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 3,
    pregunta: '¿Qué produce este código async/await?',
    codigo: `
async Task<int> Foo() {
  await Task.Delay(1000);
  return 42;
}
var t = Foo();
Console.WriteLine(t.Result);
    `,
    opcionesRespuesta: {
      a: '42 tras 1 segundo',
      b: '0',
      c: 'Excepción por deadlock',
      d: 'Imprime Task`1',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 4,
    pregunta: '¿Qué comportamiento tiene este servicio en ASP.NET Core?',
    codigo: `
services.AddSingleton<IService, MyService>();
services.AddScoped<IOther, OtherService>();
    `,
    opcionesRespuesta: {
      a: 'MyService se crea por petición HTTP; OtherService una sola vez',
      b: 'MyService una sola vez; OtherService por petición HTTP',
      c: 'Ambos se crean por petición HTTP',
      d: 'Ambos se crean una sola vez',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 5,
    pregunta: '¿Qué error detectará el compilador aquí?',
    codigo: `
class A { }
class B : A { }
B b = new A();
    `,
    opcionesRespuesta: {
      a: 'No hay error',
      b: 'Conversión imposible de A a B',
      c: 'Uso de tipos ambiguos',
      d: 'Error en tiempo de ejecución',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 6,
    pregunta: '¿Cuál es el propósito de ConfigureAwait(false)?',
    codigo: `
await SomeAsync().ConfigureAwait(false);
    `,
    opcionesRespuesta: {
      a: 'Previene deadlocks y no vuelve al contexto original',
      b: 'Forza sincronización con el hilo UI',
      c: 'Es equivalente a await normal',
      d: 'Lanza excepción si no está en UI thread',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 7,
    pregunta: '¿Qué genera el GC cuando se llama a Dispose() en un objeto?',
    codigo: `
using(var r = new Resource()) {
  // ...
}
    `,
    opcionesRespuesta: {
      a: 'Llama a Finalize inmediatamente',
      b: 'Libera sin pasar por GC',
      c: 'Marcar para recolección y llama Dispose',
      d: 'Invoca GC.Collect() automáticamente',
    },
    respuestaCorrecta: 'c',
  },
  {
    id: 8,
    pregunta: '¿Qué patrón implementa esta interfaz?',
    codigo: `
public interface IRepository<T> {
  T Get(int id);
  void Add(T entity);
}
    `,
    opcionesRespuesta: {
      a: 'Singleton',
      b: 'Repository',
      c: 'Decorator',
      d: 'Factory',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 9,
    pregunta: '¿Cuál es el middleware que maneja excepciones globales en ASP.NET Core?',
    codigo: `
app.UseExceptionHandler("/Error");
    `,
    opcionesRespuesta: {
      a: 'UseRouting',
      b: 'UseAuthorization',
      c: 'UseExceptionHandler',
      d: 'UseEndpoints',
    },
    respuestaCorrecta: 'c',
  },
  {
    id: 10,
    pregunta: '¿Qué devuelve el método TryParse si falla la conversión?',
    codigo: `
int result;
bool ok = int.TryParse("abc", out result);
    `,
    opcionesRespuesta: {
      a: 'ok = true, result = 0',
      b: 'ok = false, result = 0',
      c: 'ok = false, result = null',
      d: 'Excepción de formato',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 11,
    pregunta: '¿Qué característica de C# se usa aquí?',
    codigo: `
var point = new { X = 1, Y = 2 };
    `,
    opcionesRespuesta: {
      a: 'Tupla',
      b: 'Record',
      c: 'Objeto anónimo',
      d: 'Expresión lambda',
    },
    respuestaCorrecta: 'c',
  },
  {
    id: 12,
    pregunta: '¿Qué sucede si Entity Framework no encuentra la clave?',
    codigo: `
var u = context.Users.Find(999);
    `,
    opcionesRespuesta: {
      a: 'Lanza excepción',
      b: 'Devuelve null',
      c: 'Crea una nueva entidad',
      d: 'Bloquea la consulta',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 13,
    pregunta: '¿Qué efecto tiene InMemoryDatabase en pruebas?',
    codigo: `
services.AddDbContext<AppDb>(opt => 
  opt.UseInMemoryDatabase("TestDB"));
    `,
    opcionesRespuesta: {
      a: 'Usa una base SQLite en memoria',
      b: 'Usa EF Core en memoria sin persistencia',
      c: 'Conecta a SQL Server local',
      d: 'Lanza excepción si no existe DB',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 14,
    pregunta: '¿Qué generará este interpolated string?',
    codigo: `
int a = 3, b = 4;
string s = $"{a} + {b} = {a + b}";
Console.WriteLine(s);
    `,
    opcionesRespuesta: {
      a: '3+4=7',
      b: '3 + 4 = 7',
      c: 'a + b = 7',
      d: 'Error de compilación',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 15,
    pregunta: '¿Qué sucede cuando se marca un método con async void?',
    codigo: `
async void Foo() { await Task.Delay(100); }
    `,
    opcionesRespuesta: {
      a: 'Se puede await en su llamada',
      b: 'Captura excepciones en el sincronization context',
      c: 'No se puede await y excepciones no son capturables',
      d: 'Se convierte automáticamente en Task',
    },
    respuestaCorrecta: 'c',
  },
];

const preguntasJava = [
  {
    id: 1,
    pregunta: '¿Qué imprimirá este fragmento?',
    codigo: `
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
for (String s : list) {
    if (s.equals("A")) list.remove(s);
}
System.out.println(list);
    `,
    opcionesRespuesta: {
      a: '[B]',
      b: '[A, B]',
      c: 'ConcurrentModificationException',
      d: '[]',
    },
    respuestaCorrecta: 'c',
  },
  {
    id: 2,
    pregunta: '¿Qué devuelve este método genérico?',
    codigo: `
public static <T> T first(List<T> list) {
    return list.isEmpty() ? null : list.get(0);
}
Integer x = first(Arrays.asList(1,2,3));
    `,
    opcionesRespuesta: {
      a: '1',
      b: 'null',
      c: 'Compila con warning',
      d: 'Error en tiempo de ejecución',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 3,
    pregunta: '¿Cuál es el resultado?',
    codigo: `
String s = "hello";
s.concat(" world");
System.out.println(s);
    `,
    opcionesRespuesta: {
      a: 'hello world',
      b: 'hello',
      c: 'Error de compilación',
      d: 'null',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 4,
    pregunta: '¿Qué comportamiento tiene este bloque sincronizado?',
    codigo: `
public class A {
  public synchronized void m() { /*...*/ }
  public void n() {
    synchronized(this) { /*...*/ }
  }
}
    `,
    opcionesRespuesta: {
      a: 'm() y n() pueden ejecutarse en paralelo',
      b: 'm() bloquea sobre this; n() bloquea sobre this también',
      c: 'n() no es thread‑safe',
      d: 'm() bloquea en clase, n() en instancia',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 5,
    pregunta: '¿Qué imprime?',
    codigo: `
int[] a = {1,2,3};
int[] b = a.clone();
System.out.println(a == b);
    `,
    opcionesRespuesta: {
      a: 'true',
      b: 'false',
      c: 'Compila con warning',
      d: 'Error en tiempo de compilación',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 6,
    pregunta: '¿Cómo se comporta este stream?',
    codigo: `
Stream.of(1,2,3,4)
  .peek(System.out::println)
  .filter(n -> n % 2 == 0)
  .count();
    `,
    opcionesRespuesta: {
      a: 'Imprime 1 2 3 4 y devuelve 2',
      b: 'No imprime nada hasta terminal operation',
      c: 'Imprime solo 2 4 y devuelve 2',
      d: 'Error de stream pipeline',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 7,
    pregunta: '¿Qué valor tendrá x?',
    codigo: `
int x = 0;
Runnable r = () -> x++;
new Thread(r).start();
System.out.println(x);
    `,
    opcionesRespuesta: {
      a: '0 o 1 (race)',
      b: 'Siempre 1',
      c: 'Error: x no es final',
      d: 'Compila pero no imprime',
    },
    respuestaCorrecta: 'c',
  },
  {
    id: 8,
    pregunta: '¿Qué imprime este varargs?',
    codigo: `
public static void m(String... args) {
    System.out.println(args.length);
}
m();
m("A","B");
    `,
    opcionesRespuesta: {
      a: '0 y 2',
      b: '1 y 2',
      c: 'Error de compilación',
      d: '0 y 0',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 9,
    pregunta: '¿Qué sucede si no serializamos bien?',
    codigo: `
class A implements Serializable {
  private transient B b;
}
    `,
    opcionesRespuesta: {
      a: 'b se serializa normalmente',
      b: 'b se omite en la serialización',
      c: 'Error en tiempo de ejecución',
      d: 'Debe implementar Serializable en B también',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 10,
    pregunta: '¿Qué imprime?',
    codigo: `
Optional<String> o = Optional.ofNullable(null);
System.out.println(o.orElseGet(() -> "def"));
    `,
    opcionesRespuesta: {
      a: 'null',
      b: 'def',
      c: 'NoSuchElementException',
      d: 'Optional.empty',
    },
    respuestaCorrecta: 'b',
  },
  {
    id: 11,
    pregunta: '¿Cuál es el efecto de volatile aquí?',
    codigo: `
class A {
  private volatile boolean flag = false;
  public void set() { flag = true; }
  public void waitUntil() { while(!flag); }
}
    `,
    opcionesRespuesta: {
      a: 'Evita optimizaciones de caché en CPU',
      b: 'Hace el método set() synchronized',
      c: 'Garantiza atomicidad de flag++',
      d: 'No sirve para sincronización',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 12,
    pregunta: '¿Qué hace este código con CompletableFuture?',
    codigo: `
CompletableFuture<Integer> cf = CompletableFuture
  .supplyAsync(() -> 2)
  .thenApply(n -> n * 3);
System.out.println(cf.get());
    `,
    opcionesRespuesta: {
      a: '6',
      b: '2',
      c: 'CompletableFuture[Not completed]',
      d: 'Error de concurrencia',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 13,
    pregunta: '¿Cómo afecta este método reflexivo?',
    codigo: `
Method m = String.class.getMethod("substring", int.class);
String s = (String) m.invoke("abc", 1);
System.out.println(s);
    `,
    opcionesRespuesta: {
      a: '"bc"',
      b: '"abc"',
      c: 'Error IllegalAccessException',
      d: 'Error NoSuchMethodException',
    },
    respuestaCorrecta: 'a',
  },
  {
    id: 14,
    pregunta: '¿Cuál es la retention de @Retention(RUNTIME)?',
    codigo: `
@Retention(RUNTIME)
@interface T {}
    `,
    opcionesRespuesta: {
      a: 'Disponible solo en fuente',
      b: 'En bytecode pero no en runtime',
      c: 'Disponible en tiempo de ejecución',
      d: 'Depende de la JVM',
    },
    respuestaCorrecta: 'c',
  },
  {
    id: 15,
    pregunta: '¿Qué imprime?',
    codigo: `
int result = Stream.of(1,2,3)
    .parallel()
    .reduce(0, Integer::sum);
System.out.println(result);
    `,
    opcionesRespuesta: {
      a: '6',
      b: '0',
      c: 'Depende del orden',
      d: 'Error en parallel stream',
    },
    respuestaCorrecta: 'a',
  },
];

const preguntasGeneral = [
  {
    id: 1,
    pregunta: "¿Qué complejidad temporal tiene la búsqueda binaria en un array ordenado de n elementos?",
    opcionesRespuesta: {
      a: "O(n)",
      b: "O(log n)",
      c: "O(n log n)",
      d: "O(1)"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 2,
    pregunta: "En un grafo dirigido, ¿qué algoritmo encuentra el camino mínimo desde un solo origen a todos los vértices, siempre que no haya pesos negativos?",
    opcionesRespuesta: {
      a: "Bellman–Ford",
      b: "Floyd–Warshall",
      c: "Dijkstra",
      d: "Prim"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 3,
    pregunta: "¿Cuál de estas estructuras de datos tiene acceso aleatorio (random access) en tiempo constante?",
    opcionesRespuesta: {
      a: "Lista enlazada",
      b: "Árbol binario de búsqueda",
      c: "Hash table",
      d: "Cola"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 4,
    pregunta: "¿Qué patrón de diseño sugiere usar una interfaz común para crear familias de objetos relacionados sin especificar sus clases concretas?",
    opcionesRespuesta: {
      a: "Singleton",
      b: "Abstract Factory",
      c: "Observer",
      d: "Decorator"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 5,
    pregunta: "En un sistema multi‑hilo, ¿qué problema se evita al usar un mutex (lock)?",
    opcionesRespuesta: {
      a: "Race condition",
      b: "Deadlock",
      c: "Starvation",
      d: "Memory leak"
    },
    respuestaCorrecta: "a"
  },
  {
    id: 6,
    pregunta: "¿Qué propiedad de la transacción en bases de datos asegura que una vez completada, sus cambios persisten a pesar de fallos?",
    opcionesRespuesta: {
      a: "Atomicidad",
      b: "Consistencia",
      c: "Aislamiento",
      d: "Durabilidad"
    },
    respuestaCorrecta: "d"
  },
  {
    id: 7,
    pregunta: "¿Cuál es la diferencia principal entre compilación just‑in‑time (JIT) y ahead‑of‑time (AOT)?",
    opcionesRespuesta: {
      a: "JIT convierte código nativo a bytecode, AOT hace lo contrario",
      b: "JIT compila en tiempo de ejecución, AOT antes de la ejecución",
      c: "JIT requiere optimización manual, AOT automática",
      d: "No hay diferencia"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 8,
    pregunta: "¿Qué técnica de manejo de memoria libera objetos inaccesibles automáticamente?",
    opcionesRespuesta: {
      a: "Manual allocation",
      b: "Memory pooling",
      c: "Garbage collection",
      d: "Stack allocation"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 9,
    pregunta: "¿Qué orden de recorrido de un árbol binario corresponde a In‐orden (in‑order)?",
    codigo: `
function inOrder(node) {
  if (!node) return;
  inOrder(node.left);
  console.log(node.value);
  inOrder(node.right);
}
    `,
    opcionesRespuesta: {
      a: "Raíz‑Izquierda‑Derecha",
      b: "Izquierda‑Raíz‑Derecha",
      c: "Izquierda‑Derecha‑Raíz",
      d: "Derecha‑Raíz‑Izquierda"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 10,
    pregunta: "¿Qué método de concurrencia admite múltiples lectores pero un solo escritor simultáneo?",
    opcionesRespuesta: {
      a: "Mutex (lock) estándar",
      b: "Read–write lock",
      c: "Semaphore binario",
      d: "Spinlock"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 11,
    pregunta: "¿Cuál es la salida esperada de este pseudocódigo que imprime la pila tras dos pushes y un pop?",
    codigo: `
stack = []
stack.push(1)
stack.push(2)
stack.pop()
print(stack)
    `,
    opcionesRespuesta: {
      a: "[1, 2]",
      b: "[1]",
      c: "[2]",
      d: "[]"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 12,
    pregunta: "En diseño de bases de datos relacionales, ¿qué normalización previene la duplicación de datos al separar en tablas?",
    opcionesRespuesta: {
      a: "Primera forma normal (1NF)",
      b: "Segunda forma normal (2NF)",
      c: "Tercera forma normal (3NF)",
      d: "Boyce–Codd normal form (BCNF)"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 13,
    pregunta: "¿Qué estrategia de almacenamiento en caché expulsa el elemento menos recientemente usado?",
    opcionesRespuesta: {
      a: "FIFO",
      b: "LRU",
      c: "LFU",
      d: "Random"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 14,
    pregunta: "¿Qué tipo de tipado convierte implícitamente entre tipos según el contexto?",
    opcionesRespuesta: {
      a: "Tipado estático",
      b: "Tipado dinámico",
      c: "Tipado fuerte",
      d: "Tipado débil"
    },
    respuestaCorrecta: "d"
  },
  {
    id: 15,
    pregunta: "¿Qué métrica mide cuántas líneas de código se cubren durante pruebas?",
    opcionesRespuesta: {
      a: "Cobertura de rama",
      b: "Cobertura de condición",
      c: "Cobertura de líneas",
      d: "Cobertura de función"
    },
    respuestaCorrecta: "c"
  }
];

const preguntasScrum = [
  {
    id: 1,
    pregunta: "¿Quién es responsable de maximizar el valor del producto y gestionar el Product Backlog?",
    opcionesRespuesta: {
      a: "Scrum Master",
      b: "Product Owner",
      c: "Equipo de Desarrollo",
      d: "Stakeholders"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 2,
    pregunta: "¿Cuál es la duración máxima recomendada de un Sprint en Scrum?",
    opcionesRespuesta: {
      a: "1 semana",
      b: "2 semanas",
      c: "1 mes",
      d: "3 meses"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 3,
    pregunta: "¿Qué evento de Scrum sirve para inspeccionar el incremento y adaptarlo antes de pasar al siguiente Sprint?",
    opcionesRespuesta: {
      a: "Sprint Planning",
      b: "Daily Scrum",
      c: "Sprint Review",
      d: "Sprint Retrospective"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 4,
    pregunta: "¿Qué artefacto de Scrum representa el trabajo que el Equipo de Desarrollo se compromete a completar durante un Sprint?",
    opcionesRespuesta: {
      a: "Product Backlog",
      b: "Sprint Backlog",
      c: "Incremento",
      d: "Definition of Done"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 5,
    pregunta: "¿Cuál es el propósito principal de la Daily Scrum?",
    opcionesRespuesta: {
      a: "Actualizar el Product Backlog",
      b: "Replanificar el Sprint y sincronizar al equipo",
      c: "Presentar el incremento a los stakeholders",
      d: "Refinar requisitos futuros"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 6,
    pregunta: "¿Qué define el compromiso 'Definition of Done' en Scrum?",
    opcionesRespuesta: {
      a: "El criterio de aceptación de cada ítem de Product Backlog",
      b: "Las tareas necesarias para iniciar un Sprint",
      c: "El conjunto de condiciones que debe cumplir un incremento para considerarse terminado",
      d: "Los criterios de selección de historias de usuario"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 7,
    pregunta: "¿Quién facilita la eliminación de impedimentos y protege al equipo de interferencias externas?",
    opcionesRespuesta: {
      a: "Product Owner",
      b: "Scrum Master",
      c: "Sponsor",
      d: "Manager"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 8,
    pregunta: "¿En qué momento se actualiza el Product Backlog durante el Sprint?",
    opcionesRespuesta: {
      a: "Solo en Sprint Planning",
      b: "Durante el Daily Scrum",
      c: "De forma continua mediante refinamiento",
      d: "En el Sprint Review"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 9,
    pregunta: "¿Qué métrica mide el trabajo completado por Sprint y se usa para predecir la capacidad futura?",
    opcionesRespuesta: {
      a: "Burn‑down chart",
      b: "Burn‑up chart",
      c: "Velocity",
      d: "Cycle time"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 10,
    pregunta: "¿Qué práctica busca identificar lecciones aprendidas y oportunidas de mejora al final de cada Sprint?",
    opcionesRespuesta: {
      a: "Sprint Review",
      b: "Retrospectiva de Sprint",
      c: "Product Backlog Refinement",
      d: "Daily Scrum"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 11,
    pregunta: "¿Cuál es el foco principal del Sprint Goal?",
    opcionesRespuesta: {
      a: "Detallar tareas técnicas",
      b: "Definir el presupuesto del Sprint",
      c: "Guiar al equipo sobre el propósito del Sprint",
      d: "Asignar roles específicos"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 12,
    pregunta: "¿Qué ocurre si durante el Sprint se descubre trabajo más valioso fuera del Sprint Backlog?",
    opcionesRespuesta: {
      a: "El Sprint se cancela y se inicia uno nuevo",
      b: "El Product Owner actualiza el Sprint Backlog tras consultar al equipo",
      c: "Se ignora hasta el siguiente Sprint Planning",
      d: "El Scrum Master decide qué se prioriza"
    },
    respuestaCorrecta: "b"
  },
  {
    id: 13,
    pregunta: "¿Cuál de estos NO es un pilar de Scrum?",
    opcionesRespuesta: {
      a: "Transparencia",
      b: "Inspección",
      c: "Adaptación",
      d: "Optimización"
    },
    respuestaCorrecta: "d"
  },
  {
    id: 14,
    pregunta: "¿Qué rol es el único responsable de gestionar el Sprint Backlog?",
    opcionesRespuesta: {
      a: "Product Owner",
      b: "Scrum Master",
      c: "Equipo de Desarrollo",
      d: "Stakeholders"
    },
    respuestaCorrecta: "c"
  },
  {
    id: 15,
    pregunta: "¿Qué técnica de estimación en Scrum utiliza series de Fibonacci para puntuar historias?",
    opcionesRespuesta: {
      a: "T‑shirt sizing",
      b: "Planning poker",
      c: "Bucket system",
      d: "Dot voting"
    },
    respuestaCorrecta: "b"
  }
];



export { preguntasReact, preguntasNet, preguntasJava, preguntasGeneral, preguntasScrum };
