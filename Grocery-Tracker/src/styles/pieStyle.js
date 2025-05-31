import { StyleSheet } from 'react-native';

export const pieStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
  },
  emptySubText: {
    fontSize: 14,
    color: '#ADB5BD',
    marginTop: 5,
  },
  loadingContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6C757D',
    fontSize: 14,
  },
  legendContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#2D3047',
  },
});