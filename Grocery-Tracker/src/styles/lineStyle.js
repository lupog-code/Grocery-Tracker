import { StyleSheet } from 'react-native';

export const lineStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
    marginLeft: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  emptyContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});