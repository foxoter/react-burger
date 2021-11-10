import { PayloadAction } from '@reduxjs/toolkit';
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_STOP_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from '../constants/ws-auth-actions';
import { TOrdersInfo } from '../types/t-order-data';

export type TWsAuthActionTypes = {
  wsInit: typeof WS_CONNECTION_START_AUTH,
  wsStop: typeof WS_CONNECTION_STOP_AUTH,
  onOpen: typeof WS_CONNECTION_SUCCESS_AUTH,
  onClose: typeof WS_CONNECTION_CLOSED_AUTH,
  onError: typeof WS_CONNECTION_ERROR_AUTH,
  onMessage: typeof WS_GET_MESSAGE_AUTH,
  wsSendMessage: typeof WS_SEND_MESSAGE_AUTH,
}

export const wsAuthActions = {
  wsInit: WS_CONNECTION_START_AUTH,
  wsStop: WS_CONNECTION_STOP_AUTH,
  onOpen: WS_CONNECTION_SUCCESS_AUTH,
  onClose: WS_CONNECTION_CLOSED_AUTH,
  onError: WS_CONNECTION_ERROR_AUTH,
  onMessage: WS_GET_MESSAGE_AUTH,
  wsSendMessage: WS_SEND_MESSAGE_AUTH,
}

export interface IWsAuthConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}

export interface IWsAuthConnectionStopAction {
  readonly type: typeof WS_CONNECTION_STOP_AUTH;
}

export interface IWsAuthConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
}

export interface IWsAuthConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR_AUTH;
  readonly payload: PayloadAction;
}

export interface IWsAuthConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
}

export interface IWsAuthGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE_AUTH;
  readonly payload: TOrdersInfo
}

export interface IWsAuthSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE_AUTH;
  readonly payload: PayloadAction;
}

export type TWsAuthActions =
  IWsAuthConnectionStartAction
  | IWsAuthConnectionStopAction
  | IWsAuthConnectionSuccessAction
  | IWsAuthConnectionErrorAction
  | IWsAuthConnectionClosedAction
  | IWsAuthGetMessageAction
  | IWsAuthSendMessageAction