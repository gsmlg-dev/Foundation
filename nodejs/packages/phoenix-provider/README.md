<div align="center">
<h1>PhoenixProvider 🛠📦</h1>

<p>Provide phoenix socket and channel by React Context.</p>
</div>

---

### Now is written by typescript

Can be check

### API

```javascript
import {
    Provider,
    Consumer,
    useSocket,
    useChannel,
    usePresence,
} from 'phoenix-provider';

React.rencer(
    <Provider url={'/socket'} options={{ params: {token: 'my-app-token' }}}>
        <App>
    </Provider>
)

const App = () => {
    const socket = useSocket();

    return (
        <div>
            <div>
                {socket.isConnected() ? 'connected' : 'disconnected'}
            </div>
            <div>
                <Channel />
            </div>
        </div>
    );
};

const Channel = () => {
    const [list, setList] = useState([]);
    const channel = useChannel('lobby', { user: 'Josh' });

    const presence = usePresence('lobby');

    useEffect(() => {
        presence.onSync(() => {
            setList(presence.list());
        });
    }, [presence]);

    return (
        <ul>
            {list?.map((l) => (
                <li>{l}</li>
            ))}
        </ul>
    );
}

```
