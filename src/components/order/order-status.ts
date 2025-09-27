enum OrderStatus {
  Done = "done",
  Creating = "creating",
  Pending = "pending",
}

export const getOrderStatus = (status?: string): string => {
  switch (status) {
    case OrderStatus.Done:
      return "Выполнен";
    case OrderStatus.Creating:
      return "Готовится";
    case OrderStatus.Pending:
      return "Отменён"
    default:
      return "Неизвестно";
  }
};