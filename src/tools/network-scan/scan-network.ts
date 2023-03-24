import { ITcpScan } from './types';

function convertRawJsonToScanResults(xmlInput: ITcpScan) {
  const hostT = xmlInput?.nmaprun?.host?.map((hosts) => {
    try {
      console.error('HOSTS ==>', { hosts });
      const target = {
        address: hosts?.address?.map((addr) => {
          return {
            addr: addr?.$?.addr,
            addrType: addr?.$?.addrtype,
          };
        }),
        hostName: hosts?.hostnames?.map((host) => {
          return {
            names: host?.hostname?.map((e) => {
              return {
                name: e?.$?.name,
              };
            }),
          };
        }),
        ports: hosts?.ports?.map((port, idxPort: number) => {
          return port?.port?.map((serv, idxServ) => {
            return {
              number: port?.port?.[idxServ]?.$?.portid,
              protocol: port?.port?.[idxServ]?.$?.protocol,
              state: serv?.state?.[idxPort]?.$?.state,
              service: serv?.service?.[idxPort]?.$?.name,
              product: serv?.service?.[idxPort]?.$?.product,
              deviceType: serv?.service?.[idxPort]?.$?.devicetype,
              osType: serv?.service?.[idxPort]?.$?.ostype,
              extraInfo: serv?.service?.[idxPort]?.$?.extrainfo,
            };
          });
        }),
      };
      console.log('TARGET', target);
      return target;
    } catch (err) {
      return console.log(err);
    }
  });

  return hostT;
}
export default convertRawJsonToScanResults;
