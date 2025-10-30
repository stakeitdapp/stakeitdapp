import {
  Client,
  ContractExecuteTransaction,
  ContractCallQuery,
  ContractFunctionParameters,
  Hbar,
} from "@hashgraph/sdk";
import Long from "long";
import { config } from "../config";

class HederaService {
  private client: Client;

  constructor() {
    this.client = Client.forName(config.hederaNetwork).setOperator(
      config.operatorId,
      config.operatorKey
    );
  }

  private buildFunctionParams(params: any[] = []) {
    const functionParams = new ContractFunctionParameters();
    params.forEach((param) => {
      if (param === null || param === undefined) return;

      if (typeof param === "string") {
        functionParams.addString(param);
      } else if (typeof param === "number") {
        // JS number -> uint256
        functionParams.addUint256(param);
      } else if (typeof param === "boolean") {
        functionParams.addBool(param);
      } else if (param instanceof Uint8Array || Buffer.isBuffer(param)) {
        functionParams.addBytes(param as Uint8Array);
      } else if (typeof param === "bigint") {
        // convert bigint to Long for SDK
        functionParams.addUint256(Long.fromString(param.toString()));
      } else {
        throw new Error(`Unsupported parameter type: ${typeof param}`);
      }
    });
    return functionParams;
  }

  /**
   * Execute a contract function that changes state (transaction)
   * @param functionName name of the solidity function
   * @param params array of parameters (strings, numbers, booleans, bytes)
   * @param gas optional gas amount
   * @param payableHbar optional HBAR amount to send with the call
   */
  async executeContract(
    functionName: string,
    params: any[] = [],
    gas = 100_000,
    payableHbar?: number | string
  ) {
    try {
      const functionParams = this.buildFunctionParams(params);

      const tx = new ContractExecuteTransaction()
        .setContractId(config.contractAddress)
        .setFunction(functionName, functionParams)
        .setGas(gas);

      if (payableHbar !== undefined) {
        tx.setPayableAmount(new Hbar(Number(payableHbar)));
      }

      const txResponse = await tx.execute(this.client);
      const receipt = await txResponse.getReceipt(this.client);
      return receipt;
    } catch (error) {
      console.error(
        `Error executing contract function ${functionName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Query a contract view/pure function
   */
  async queryContract(functionName: string, params: any[] = [], gas = 100_000) {
    try {
      const functionParams = this.buildFunctionParams(params);

      const query = new ContractCallQuery()
        .setContractId(config.contractAddress)
        .setFunction(functionName, functionParams)
        .setGas(gas);

      const response = await query.execute(this.client);
      return response;
    } catch (error) {
      console.error(`Error querying contract function ${functionName}:`, error);
      throw error;
    }
  }
}

export default new HederaService();
