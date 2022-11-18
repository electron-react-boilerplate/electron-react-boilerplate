import { ITcpScan } from './types/scan-network.types';

function convertRawJsonToScanResults(xmlInput: ITcpScan) {
  const hostT = xmlInput.nmaprun.host.map((host, index) => {
    const target = {
      address: host.address[index].$.addr,
      hostName: host.hostnames[index].hostname[0].$.name,
      ports: host.ports.map((port, idxPort: number) => {
        return port.port.map((serv, idxServ) => {
          return {
            number: port.port[idxServ].$.portid,
            protocol: port.port[idxServ].$.protocol,
            state: serv.state[idxPort].$.state,
            service: serv.service[idxPort].$.name,
            product: serv.service[idxPort].$.product,
            deviceType: serv.service[idxPort].$.devicetype,
            osType: serv.service[idxPort].$.ostype,
            extraInfo: serv.service[idxPort].$.extrainfo,
          };
        });
      }),
    };
    return target;
  });

  return hostT;
}
export default convertRawJsonToScanResults;
